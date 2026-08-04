#!/usr/bin/env bash
# Fix jogiinvisiblegrills PM2 + nginx on ap-sites VPS. Run as root on server1.
# Prefers registry PORT from /etc/ap-sites/sites.d/jogiinvisiblegrills.env
set -euo pipefail

SITE_ROOT="/srv/sites/jogiinvisiblegrills/current"
PM2_NAME="jogiinvisiblegrills"
REGISTRY="/etc/ap-sites/sites.d/jogiinvisiblegrills.env"
PORT="${JOGI_PORT:-}"
HOSTNAME="${JOGI_HOSTNAME:-localhost}"

if [[ -z "$PORT" && -f "$REGISTRY" ]]; then
  PORT="$(grep -E '^PORT=' "$REGISTRY" | head -1 | cut -d= -f2- | tr -d '"' | tr -d "'")"
fi
PORT="${PORT:-3002}"

echo "=== 1) Release layout ==="
ls -la "$SITE_ROOT/server.js" 2>/dev/null || true
ls -la "$SITE_ROOT/.next/standalone/server.js" 2>/dev/null || true

if [[ -f "$SITE_ROOT/.next/standalone/server.js" ]]; then
  CWD="$SITE_ROOT/.next/standalone"
elif [[ -f "$SITE_ROOT/server.js" ]]; then
  CWD="$SITE_ROOT"
else
  echo "ERROR: no server.js — redeploy required"
  exit 1
fi

echo "Using cwd=$CWD PORT=$PORT HOSTNAME=$HOSTNAME"

echo "=== 2) Who uses port $PORT ==="
ss -tlnp | grep "$PORT" || true

echo "=== 3) Manual smoke test (5s) ==="
pkill -f "$CWD/server.js" 2>/dev/null || true
cd "$CWD"
PORT="$PORT" HOSTNAME="$HOSTNAME" timeout 5 node server.js &
sleep 2
if curl -sf "http://localhost:${PORT}/api/site-identity/"; then
  echo
else
  echo "MANUAL START FAILED — check logs or run node server.js in $CWD"
  pkill -f "$CWD/server.js" 2>/dev/null || true
  exit 1
fi
pkill -f "$CWD/server.js" 2>/dev/null || true
sleep 1

echo "=== 4) Prefer fleet PM2 config if available ==="
if [[ -f /etc/ap-sites/ecosystem.multisite.config.cjs ]]; then
  node -c /etc/ap-sites/ecosystem.multisite.config.cjs
  pm2 delete "$PM2_NAME" 2>/dev/null || true
  pm2 start /etc/ap-sites/ecosystem.multisite.config.cjs --only "$PM2_NAME"
else
  TMP_ECOSYSTEM="/tmp/jogi-pm2-fix.cjs"
  cat > "$TMP_ECOSYSTEM" <<EOF
module.exports = {
  apps: [{
    name: "${PM2_NAME}",
    cwd: "${CWD}",
    script: "server.js",
    instances: 1,
    exec_mode: "fork",
    max_memory_restart: "768M",
    env: {
      NODE_ENV: "production",
      PORT: ${PORT},
      HOSTNAME: "${HOSTNAME}",
    },
  }],
};
EOF
  pm2 delete "$PM2_NAME" 2>/dev/null || true
  pm2 start "$TMP_ECOSYSTEM"
fi
pm2 save

echo "=== 5) Verify listen + curl ==="
sleep 2
ss -tlnp | grep "$PORT" || true
curl -sf "http://localhost:${PORT}/api/site-identity/" && echo

echo "=== 6) nginx: one vhost, proxy_pass localhost:$PORT ==="
NGINX_AVAIL="/etc/nginx/sites-available/jogiinvisiblegrills.in"
NGINX_SRC="$SITE_ROOT/deploy/nginx-jogiinvisiblegrills.conf"
if [[ -f "$NGINX_SRC" ]]; then
  cp "$NGINX_SRC" "$NGINX_AVAIL"
fi
# Remove duplicate that causes "conflicting server name ... ignored"
rm -f /etc/nginx/sites-enabled/jogiinvisiblegrills.conf
ln -sf "$NGINX_AVAIL" /etc/nginx/sites-enabled/jogiinvisiblegrills.in
sed -i "s|proxy_pass http://[^:;]*:[0-9]*;|proxy_pass http://localhost:${PORT};|" "$NGINX_AVAIL"
grep proxy_pass "$NGINX_AVAIL"
nginx -t
# Fail loudly if duplicate still present
if nginx -t 2>&1 | grep -q 'conflicting server name ".*jogiinvisiblegrills'; then
  echo "ERROR: duplicate jogi nginx vhost still enabled — remove extra sites-enabled symlink"
  exit 1
fi
systemctl reload nginx
curl -sf "https://www.jogiinvisiblegrills.in/api/site-identity/" && echo

echo "=== DONE ==="
