#!/usr/bin/env bash
# Threshold disk guard for a multi-site VPS (ap-sites /srv/sites + legacy /var/www).
#
# Runs often (systemd timer). Does nothing until USED disk crosses THRESHOLD_GB,
# then cleans in escalating levels until usage drops below TARGET_GB.
#
# Zero downtime by design:
#   - never stops, restarts or reloads any PM2 app
#   - never deletes the release a PM2 process is running from (pm_cwd / pm_exec_path)
#   - never deletes `current` symlink targets, shared/.env, public/ or uploads
#
# Env overrides: THRESHOLD_GB TARGET_GB KEEP_RELEASES DRY_RUN MOUNT
set -uo pipefail

MOUNT="${MOUNT:-/}"
THRESHOLD_GB="${THRESHOLD_GB:-160}"
TARGET_GB="${TARGET_GB:-150}"
KEEP_RELEASES="${KEEP_RELEASES:-2}"
SITES_ROOT="${SITES_ROOT:-/srv/sites}"
WEB_ROOT="${WEB_ROOT:-/var/www}"
LOG_FILE="${LOG_FILE:-/var/log/disk-guard.log}"
LOCK_FILE="/run/disk-guard.lock"
DRY_RUN="${DRY_RUN:-0}"

GB=$((1024 * 1024 * 1024))
THRESHOLD_B=$((THRESHOLD_GB * GB))
TARGET_B=$((TARGET_GB * GB))

log() { echo "[$(date -Iseconds)] $*" >>"$LOG_FILE"; }

used_bytes() {
  df -B1 --output=used "$MOUNT" 2>/dev/null | tail -1 | tr -d ' '
}

human() { numfmt --to=iec "${1:-0}" 2>/dev/null || echo "${1:-0}B"; }

# Paths PM2 is actively serving from — deleting these would cause downtime.
protected_paths() {
  command -v pm2 >/dev/null 2>&1 || return 0
  command -v node >/dev/null 2>&1 || return 0
  pm2 jlist 2>/dev/null | node -e '
    let raw = "";
    process.stdin.on("data", (c) => (raw += c));
    process.stdin.on("end", () => {
      let apps = [];
      try { apps = JSON.parse(raw); } catch { process.exit(0); }
      const out = new Set();
      for (const app of apps) {
        const env = app.pm2_env || {};
        for (const p of [env.pm_cwd, env.pm_exec_path, env.cwd]) {
          if (typeof p === "string" && p.startsWith("/")) out.add(p);
        }
      }
      process.stdout.write([...out].join("\n"));
    });
  ' 2>/dev/null
}

PROTECTED=""
collect_protected() {
  PROTECTED=$'\n'
  while IFS= read -r p; do
    [[ -z "$p" ]] && continue
    # resolve symlinks so `current` maps to its real release dir
    real=$(readlink -f "$p" 2>/dev/null || echo "$p")
    PROTECTED+="$real"$'\n'
  done < <(protected_paths)

  # Always protect every site's `current` target
  for root in "$SITES_ROOT" "$WEB_ROOT"; do
    [[ -d "$root" ]] || continue
    while IFS= read -r -d '' link; do
      real=$(readlink -f "$link" 2>/dev/null || true)
      [[ -n "$real" ]] && PROTECTED+="$real"$'\n'
    done < <(find "$root" -mindepth 2 -maxdepth 2 -name current -print0 2>/dev/null)
  done
}

# mode=strict (default): also refuse anything INSIDE a live release.
# mode=cache: allow deletion inside a live release — caller guarantees the path
#             is regenerated at runtime (.next/cache, node_modules/.cache, .turbo).
is_protected() {
  local path mode="${2:-strict}"
  path=$(readlink -f "$1" 2>/dev/null || echo "$1")
  while IFS= read -r p; do
    [[ -z "$p" ]] && continue
    # path IS the live release, or CONTAINS it (e.g. the releases/ dir itself)
    [[ "$path" == "$p" || "$p" == "$path"/* ]] && return 0
    # path is INSIDE the live release, e.g. .../releases/<ts>/node_modules.
    # Deleting that is exactly what produces "Cannot find module 'next'" + 502.
    if [[ "$mode" == "strict" && "$path" == "$p"/* ]]; then
      return 0
    fi
  done <<<"$PROTECTED"
  return 1
}

remove() {
  local target="$1" label="${2:-}" mode="${3:-strict}"
  [[ -e "$target" ]] || return 0
  if is_protected "$target" "$mode"; then
    log "  SKIP (in use): $target"
    return 0
  fi
  local size
  size=$(du -sb "$target" 2>/dev/null | cut -f1 || echo 0)
  if [[ "$DRY_RUN" == "1" ]]; then
    log "  DRY-RUN rm $target ($(human "$size")) $label"
  else
    rm -rf -- "$target" && log "  removed $target ($(human "$size")) $label"
  fi
}

truncate_file() {
  local f="$1"
  [[ -f "$f" ]] || return 0
  if [[ "$DRY_RUN" == "1" ]]; then
    log "  DRY-RUN truncate $f"
  else
    : >"$f" && log "  truncated $f"
  fi
}

below_target() {
  local u
  u=$(used_bytes)
  [[ -n "$u" && "$u" -lt "$TARGET_B" ]]
}

# --- Level 1: caches and logs (no site data at all) -------------------------
level1() {
  log "LEVEL 1: caches + logs"

  for root in "$SITES_ROOT" "$WEB_ROOT"; do
    [[ -d "$root" ]] || continue
    while IFS= read -r -d '' d; do
      remove "$d" "(build cache)" cache
    done < <(find "$root" -mindepth 2 -maxdepth 5 -type d \
      \( -name ".turbo" -o -name ".eslintcache" \) -print0 2>/dev/null)

    while IFS= read -r -d '' d; do
      remove "$d" "(next cache)" cache
    done < <(find "$root" -mindepth 2 -maxdepth 5 -type d -path '*/.next/cache' -print0 2>/dev/null)

    while IFS= read -r -d '' d; do
      remove "$d" "(node cache)" cache
    done < <(find "$root" -mindepth 2 -maxdepth 5 -type d -path '*/node_modules/.cache' -print0 2>/dev/null)
  done

  # Leftover build dirs from manual/failed deploys
  while IFS= read -r -d '' d; do
    remove "$d" "(stale build tmp)"
  done < <(find /tmp -maxdepth 1 -type d -name '*-build-*' -mmin +120 -print0 2>/dev/null)

  # PM2 logs: truncate large ones, delete old rotated ones (never stops apps)
  for logdir in /root/.pm2/logs "$SITES_ROOT"/*/shared/logs; do
    [[ -d "$logdir" ]] || continue
    while IFS= read -r f; do truncate_file "$f"; done \
      < <(find "$logdir" -type f -name '*.log' -size +50M 2>/dev/null)
    if [[ "$DRY_RUN" != "1" ]]; then
      find "$logdir" -type f \( -name '*.log.*' -o -name '*.gz' \) -mtime +3 -delete 2>/dev/null
    fi
  done

  if [[ "$DRY_RUN" != "1" ]]; then
    command -v journalctl >/dev/null 2>&1 && journalctl --vacuum-size=200M >/dev/null 2>&1
    command -v apt-get >/dev/null 2>&1 && apt-get clean >/dev/null 2>&1
    command -v npm >/dev/null 2>&1 && npm cache clean --force >/dev/null 2>&1
  fi
}

# --- Level 2: old releases + build-only node_modules ------------------------
level2() {
  log "LEVEL 2: old releases (keep $KEEP_RELEASES + live)"

  for root in "$SITES_ROOT" "$WEB_ROOT"; do
    [[ -d "$root" ]] || continue
    while IFS= read -r -d '' reldir; do
      # newest first; keep KEEP_RELEASES, delete the rest (protected ones skipped)
      local n=0
      while IFS= read -r rel; do
        n=$((n + 1))
        [[ "$n" -le "$KEEP_RELEASES" ]] && continue
        remove "$rel" "(old release)"
      done < <(find "$reldir" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' 2>/dev/null |
        sort -rn | cut -d' ' -f2-)
    done < <(find "$root" -mindepth 2 -maxdepth 2 -type d -name releases -print0 2>/dev/null)
  done

  # node_modules only where a standalone runtime already exists (rebuilt on deploy)
  for root in "$SITES_ROOT" "$WEB_ROOT"; do
    [[ -d "$root" ]] || continue
    while IFS= read -r -d '' nm; do
      site=$(dirname "$nm")
      if [[ -f "$site/.next/standalone/server.js" || -f "$site/current/server.js" ]]; then
        remove "$nm" "(node_modules, rebuilt on deploy)"
      fi
    done < <(find "$root" -mindepth 2 -maxdepth 3 -type d -name node_modules -print0 2>/dev/null)
  done
}

# --- Level 3: keep only the live release, hard log/journal trim -------------
level3() {
  log "LEVEL 3: keep live release only"

  for root in "$SITES_ROOT" "$WEB_ROOT"; do
    [[ -d "$root" ]] || continue
    while IFS= read -r -d '' reldir; do
      while IFS= read -r rel; do
        remove "$rel" "(non-live release)"
      done < <(find "$reldir" -mindepth 1 -maxdepth 1 -type d 2>/dev/null)
    done < <(find "$root" -mindepth 2 -maxdepth 2 -type d -name releases -print0 2>/dev/null)
  done

  # ISR/image caches of live sites — regenerated on demand, never a hard failure
  for root in "$SITES_ROOT"; do
    [[ -d "$root" ]] || continue
    while IFS= read -r -d '' c; do
      if [[ "$DRY_RUN" == "1" ]]; then
        log "  DRY-RUN clear ISR cache $c"
      else
        find "$c" -mindepth 1 -maxdepth 1 -exec rm -rf {} + 2>/dev/null &&
          log "  cleared ISR cache contents $c"
      fi
    done < <(find "$root" -mindepth 2 -maxdepth 4 -type d -path '*/shared/cache' -print0 2>/dev/null)
  done

  for logdir in /root/.pm2/logs "$SITES_ROOT"/*/shared/logs; do
    [[ -d "$logdir" ]] || continue
    while IFS= read -r f; do truncate_file "$f"; done \
      < <(find "$logdir" -type f -name '*.log' -size +5M 2>/dev/null)
  done

  if [[ "$DRY_RUN" != "1" ]]; then
    command -v journalctl >/dev/null 2>&1 && journalctl --vacuum-size=50M >/dev/null 2>&1
    command -v docker >/dev/null 2>&1 && docker system prune -af --volumes >/dev/null 2>&1
  fi
}

main() {
  touch "$LOG_FILE" 2>/dev/null || true

  local used
  used=$(used_bytes)
  if [[ -z "$used" ]]; then
    log "ERROR: cannot read df for $MOUNT"
    exit 1
  fi

  if [[ "$used" -lt "$THRESHOLD_B" && "${FORCE:-0}" != "1" ]]; then
    # quiet no-op: only log hourly to keep the log small
    if [[ "$(date +%M)" == "00" ]]; then
      log "OK used=$(human "$used") < threshold=${THRESHOLD_GB}G"
    fi
    exit 0
  fi

  log "=== TRIGGER used=$(human "$used") >= ${THRESHOLD_GB}G (target ${TARGET_GB}G) ==="
  collect_protected
  log "protected paths: $(grep -c . <<<"$PROTECTED")"

  level1
  if below_target; then
    log "=== DONE after level 1: used=$(human "$(used_bytes)") ==="
    exit 0
  fi

  level2
  if below_target; then
    log "=== DONE after level 2: used=$(human "$(used_bytes)") ==="
    exit 0
  fi

  level3
  log "=== DONE after level 3: used=$(human "$(used_bytes)") ==="
}

# Single instance only — overlapping runs would double-delete and slow the disk.
exec 9>"$LOCK_FILE" 2>/dev/null || exec 9>/tmp/disk-guard.lock
if ! flock -n 9; then
  exit 0
fi

main "$@"
