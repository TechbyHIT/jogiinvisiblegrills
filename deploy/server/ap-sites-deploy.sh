#!/usr/bin/env bash
# Atomic deploy for the ap-sites layout (/srv/sites/<slug>/releases/<ts> + current symlink).
#
#   sudo bash ap-sites-deploy.sh                 # deploy jogiinvisiblegrills
#   sudo SLUG=other-site REPO=... bash ap-sites-deploy.sh
#
# Safe by construction:
#   - builds into /tmp, never touches the live release until the build is verified
#   - `current` is switched only after server.js + node_modules/next + .next/static exist
#   - a failed or interrupted run leaves the previous release serving traffic
#   - survives SSH drops when started with nohup/setsid (see RESUME note at the end)
set -euo pipefail

SLUG="${SLUG:-jogiinvisiblegrills}"
REPO="${REPO:-https://github.com/TechbyHIT/jogiinvisiblegrills.git}"
BRANCH="${BRANCH:-main}"
SITE="/srv/sites/$SLUG"
RELEASE="$(date +%Y%m%d%H%M%S)"
DEST="$SITE/releases/$RELEASE"
BUILD="/tmp/${SLUG}-build-$RELEASE"
KEEP_RELEASES="${KEEP_RELEASES:-2}"
REGISTRY="/etc/ap-sites/sites.d/${SLUG}.env"

step() { echo "==> $*"; }
fail() {
  echo "!! $*" >&2
  echo "!! live release untouched: $(readlink -f "$SITE/current" 2>/dev/null || echo none)" >&2
  exit 1
}

[[ "$(id -u)" -eq 0 ]] || fail "run as root"

PORT="${PORT:-}"
if [[ -z "$PORT" && -f "$REGISTRY" ]]; then
  PORT="$(grep -E '^PORT=' "$REGISTRY" | head -1 | cut -d= -f2- | tr -d "\"'")"
fi
PORT="${PORT:-3002}"

step "[$SLUG] clone $BRANCH"
rm -rf "$BUILD"
git clone --depth 1 -b "$BRANCH" "$REPO" "$BUILD" || fail "clone failed"
cd "$BUILD"

step "[$SLUG] env"
if [[ -f "$SITE/shared/.env" ]]; then
  cp "$SITE/shared/.env" .env.local
elif [[ -f .env.example ]]; then
  npm run env:setup >/dev/null 2>&1 || cp .env.example .env.local
fi

step "[$SLUG] npm ci (with dev deps)"
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=4096}"
# NODE_ENV must NOT be production here: @tailwindcss/postcss and tsx are
# devDependencies that next build needs. They stay out of the standalone
# bundle regardless, since Next only traces what the server actually requires.
NODE_ENV=development npm ci --include=dev --no-audit --no-fund || fail "npm ci failed"
[[ -d node_modules/@tailwindcss/postcss ]] || fail "npm ci did not install dev deps"

step "[$SLUG] build standalone"
NODE_ENV=production npm run build:standalone || fail "build failed"

# --- Verify the BUILD before it can ever become live ------------------------
step "[$SLUG] verify build"
STANDALONE="$BUILD/.next/standalone"
[[ -f "$STANDALONE/server.js" ]] || fail "build missing server.js"
[[ -d "$STANDALONE/node_modules/next" ]] || fail "build missing node_modules/next"
[[ -d "$STANDALONE/.next/static" ]] || fail "build missing .next/static"

step "[$SLUG] stage release $RELEASE"
mkdir -p "$DEST"
# Single rsync of the standalone bundle: it already contains node_modules,
# public/ and .next/static (prepare-standalone.cjs copies them in).
rsync -a --delete "$STANDALONE/" "$DEST/" || fail "rsync of standalone failed"
# Full public/ as a belt-and-braces merge (images + generated sitemaps)
[[ -d "$BUILD/public" ]] && rsync -a "$BUILD/public/" "$DEST/public/"
mkdir -p "$DEST/deploy"
cp -a "$BUILD/deploy/." "$DEST/deploy/" 2>/dev/null || true

# --- Verify the STAGED release (catches a truncated/interrupted copy) -------
step "[$SLUG] verify release"
[[ -f "$DEST/server.js" ]] || fail "release missing server.js"
[[ -d "$DEST/node_modules/next" ]] || fail "release missing node_modules/next"
[[ -d "$DEST/.next/static" ]] || fail "release missing .next/static"
[[ -d "$DEST/public/images" ]] || echo "   warning: no public/images in release"

# Boot the new release on a scratch port before promoting it.
step "[$SLUG] smoke test on port $((PORT + 900))"
SMOKE_PORT=$((PORT + 900))
(cd "$DEST" && PORT="$SMOKE_PORT" HOSTNAME=localhost node server.js >/tmp/${SLUG}-smoke.log 2>&1) &
SMOKE_PID=$!
smoke_ok=0
for _ in $(seq 1 20); do
  sleep 1
  if curl -sf "http://localhost:${SMOKE_PORT}/api/site-identity/" >/dev/null 2>&1 ||
    curl -sf "http://localhost:${SMOKE_PORT}/" >/dev/null 2>&1; then
    smoke_ok=1
    break
  fi
done
kill "$SMOKE_PID" 2>/dev/null || true
wait "$SMOKE_PID" 2>/dev/null || true
[[ "$smoke_ok" == "1" ]] || fail "smoke test failed; see /tmp/${SLUG}-smoke.log"

PREVIOUS="$(readlink -f "$SITE/current" 2>/dev/null || echo '')"

step "[$SLUG] switch current -> releases/$RELEASE"
ln -sfn "$DEST" "$SITE/current"

step "[$SLUG] pm2 reload"
if [[ -f /etc/ap-sites/ecosystem.multisite.config.cjs ]]; then
  pm2 reload /etc/ap-sites/ecosystem.multisite.config.cjs --only "$SLUG" --update-env 2>/dev/null ||
    pm2 start /etc/ap-sites/ecosystem.multisite.config.cjs --only "$SLUG"
else
  pm2 restart "$SLUG" --update-env 2>/dev/null || fail "no pm2 app $SLUG"
fi
pm2 save >/dev/null 2>&1 || true

step "[$SLUG] health check on port $PORT"
healthy=0
for _ in $(seq 1 30); do
  sleep 1
  if curl -sf "http://localhost:${PORT}/api/site-identity/" >/dev/null 2>&1 ||
    curl -sf "http://localhost:${PORT}/" >/dev/null 2>&1; then
    healthy=1
    break
  fi
done

if [[ "$healthy" != "1" ]]; then
  echo "!! health check failed — rolling back" >&2
  if [[ -n "$PREVIOUS" && -d "$PREVIOUS" ]]; then
    ln -sfn "$PREVIOUS" "$SITE/current"
    pm2 reload /etc/ap-sites/ecosystem.multisite.config.cjs --only "$SLUG" --update-env 2>/dev/null || true
    echo "!! rolled back to $PREVIOUS" >&2
  fi
  fail "deploy failed health check"
fi

step "[$SLUG] prune old releases (keep $KEEP_RELEASES + live)"
live="$(readlink -f "$SITE/current")"
n=0
while IFS= read -r rel; do
  [[ "$rel" == "$live" ]] && continue
  n=$((n + 1))
  [[ "$n" -le "$KEEP_RELEASES" ]] && continue
  rm -rf -- "$rel" && echo "    removed old release $(basename "$rel")"
done < <(find "$SITE/releases" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' 2>/dev/null |
  sort -rn | cut -d' ' -f2-)

rm -rf "$BUILD"

step "[$SLUG] deployed $RELEASE on port $PORT"
curl -sS "http://localhost:${PORT}/api/site-identity/" 2>/dev/null || true
echo

# RESUME NOTE: run under nohup so an SSH drop cannot interrupt a deploy:
#   sudo nohup bash ap-sites-deploy.sh > /var/log/ap-deploy-$SLUG.log 2>&1 &
#   tail -f /var/log/ap-deploy-jogiinvisiblegrills.log
