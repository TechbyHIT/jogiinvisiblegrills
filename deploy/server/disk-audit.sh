#!/usr/bin/env bash
# Report largest dirs/files under /var/www for 50+ site VPS tuning.
set -euo pipefail

WEB_ROOT="${WEB_ROOT:-/var/www}"

echo "=== Disk summary: $WEB_ROOT ==="
df -h "$WEB_ROOT"
echo ""

echo "=== Top site directories ==="
du -sh "$WEB_ROOT"/* 2>/dev/null | sort -hr | head -20
echo ""

echo "=== node_modules per site (if present) ==="
for d in "$WEB_ROOT"/*; do
  [[ -d "$d/node_modules" ]] && du -sh "$d/node_modules" 2>/dev/null | awk -v s="$(basename "$d")" '{print $1 "\t" s}'
done | sort -hr | head -15
echo ""

echo "=== .next per site ==="
for d in "$WEB_ROOT"/*; do
  [[ -d "$d/.next" ]] && du -sh "$d/.next" 2>/dev/null | awk -v s="$(basename "$d")" '{print $1 "\t" s}'
done | sort -hr | head -15
echo ""

echo "=== PM2 logs ==="
du -sh /root/.pm2/logs 2>/dev/null || echo "n/a"
echo ""

echo "=== Recommendations ==="
echo "- Run post-deploy-prune after each build (npm run build:standalone includes it)"
echo "- Remove node_modules on sites using standalone PM2 (~200–800MB saved per site)"
echo "- Ensure disk-clean cron is installed: install-disk-clean-cron.sh"
