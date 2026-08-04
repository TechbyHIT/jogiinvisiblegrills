#!/usr/bin/env bash
# Standard production deploy for one Next.js site under /var/www (standalone + PM2).
# Usage: sudo -u deploy bash site-deploy.sh /var/www/example.com my-pm2-name 3005
set -euo pipefail

SITE_DIR="${1:?site directory e.g. /var/www/example.com}"
PM2_NAME="${2:?pm2 app name}"
PORT="${3:?port}"

export NODE_ENV=production
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=4096}"
export PRUNE_NODE_MODULES=1

cd "$SITE_DIR"

echo "==> [$PM2_NAME] git pull"
git pull --ff-only

echo "==> [$PM2_NAME] npm ci"
npm ci

echo "==> [$PM2_NAME] build standalone"
npm run build:standalone

echo "==> [$PM2_NAME] pm2 reload"
pm2 delete "$PM2_NAME" 2>/dev/null || true
pm2 start ecosystem.config.cjs --only "$PM2_NAME" 2>/dev/null || pm2 start ecosystem.config.cjs
pm2 save

echo "==> [$PM2_NAME] verify"
curl -sf "http://127.0.0.1:${PORT}/api/site-identity/" >/dev/null \
  || curl -sf "http://127.0.0.1:${PORT}/" >/dev/null \
  || echo "WARN: health check failed on port $PORT"

echo "==> [$PM2_NAME] deploy complete"
