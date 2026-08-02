#!/usr/bin/env bash
# Safe disk cleanup for many sites under /var/www (Next.js / Node / PM2).
# Installed via deploy/server/install-disk-clean-cron.sh
set -euo pipefail

WEB_ROOT="${WEB_ROOT:-/var/www}"
LOG_FILE="${LOG_FILE:-/var/log/disk-clean-all-sites.log}"
DRY_RUN="${DRY_RUN:-0}"
PM2_LOG_MAX_DAYS="${PM2_LOG_MAX_DAYS:-7}"
JOURNAL_MAX_DAYS="${JOURNAL_MAX_DAYS:-4}"

log() {
  echo "[$(date -Iseconds)] $*" | tee -a "$LOG_FILE"
}

run_clean() {
  if [[ "$DRY_RUN" == "1" ]]; then
    log "DRY-RUN: $*"
  else
    log "RUN: $*"
    eval "$@"
  fi
}

bytes_before=$(df -B1 --output=avail "$WEB_ROOT" 2>/dev/null | tail -1 | tr -d ' ' || echo 0)
log "=== disk-clean-all-sites start (WEB_ROOT=$WEB_ROOT) ==="
log "Available before: $(numfmt --to=iec "$bytes_before" 2>/dev/null || echo "${bytes_before}B")"

# --- Per-site: Next.js / Node caches (safe; rebuilt on next dev/build) ---
if [[ -d "$WEB_ROOT" ]]; then
  while IFS= read -r -d '' site; do
    name=$(basename "$site")

    if [[ -d "$site/.next/cache" ]]; then
      run_clean "rm -rf '$site/.next/cache'"
    fi

    if [[ -d "$site/node_modules/.cache" ]]; then
      run_clean "rm -rf '$site/node_modules/.cache'"
    fi

    # Turbopack / webpack temp (if present)
    find "$site" -maxdepth 3 -type d \( -name ".turbo" -o -name ".eslintcache" \) -print0 2>/dev/null | while IFS= read -r -d '' d; do
      run_clean "rm -rf '$d'"
    done

    # Optional: drop dev-only .next output when standalone is used for PM2 (saves GB per site)
    if [[ -d "$site/.next/standalone" && -d "$site/.next" ]]; then
      for sub in diagnostics trace; do
        if [[ -d "$site/.next/$sub" ]]; then
          run_clean "rm -rf '$site/.next/$sub'"
        fi
      done
    fi

    log "  scanned: $name"
  done < <(find "$WEB_ROOT" -mindepth 1 -maxdepth 1 -type d -print0 2>/dev/null)
fi

# --- PM2 log rotation (all apps on this server) ---
if command -v pm2 >/dev/null 2>&1; then
  if [[ -d /root/.pm2/logs ]]; then
    run_clean "find /root/.pm2/logs -type f -name '*.log' -mtime +${PM2_LOG_MAX_DAYS} -delete"
  fi
  # Truncate very large active logs (>100MB) instead of deleting
  if [[ "$DRY_RUN" != "1" ]]; then
    find /root/.pm2/logs -type f -name '*.log' -size +100M 2>/dev/null | while read -r f; do
      log "Truncating oversized PM2 log: $f"
      : > "$f"
    done
  fi
fi

# --- System caches (light touch) ---
if command -v journalctl >/dev/null 2>&1; then
  run_clean "journalctl --vacuum-time=${JOURNAL_MAX_DAYS}d"
fi

if command -v apt-get >/dev/null 2>&1; then
  run_clean "apt-get clean"
fi

if command -v npm >/dev/null 2>&1; then
  run_clean "npm cache clean --force"
fi

bytes_after=$(df -B1 --output=avail "$WEB_ROOT" 2>/dev/null | tail -1 | tr -d ' ' || echo 0)
freed=$(( bytes_after - bytes_before ))
log "Available after:  $(numfmt --to=iec "$bytes_after" 2>/dev/null || echo "${bytes_after}B")"
if [[ "$freed" -gt 0 ]]; then
  log "Freed approx:     $(numfmt --to=iec "$freed" 2>/dev/null || echo "${freed}B")"
fi
log "=== disk-clean-all-sites done ==="
