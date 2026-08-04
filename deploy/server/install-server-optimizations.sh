#!/usr/bin/env bash
# One-time server setup: PM2 logrotate, disk-clean cron, optional brotli.
set -euo pipefail

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Run as root: sudo bash $0"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "==> nginx performance snippet"
install -m 644 "$SCRIPT_DIR/../nginx-nextjs-performance.conf" /etc/nginx/snippets/nextjs-proxy.conf 2>/dev/null \
  || echo "  WARN: could not write /etc/nginx/snippets/nextjs-proxy.conf"

echo "==> PM2 logrotate (10MB max, 3 retained, compressed)"
if command -v pm2 >/dev/null 2>&1; then
  pm2 install pm2-logrotate 2>/dev/null || true
  pm2 set pm2-logrotate:max_size 10M
  pm2 set pm2-logrotate:retain 3
  pm2 set pm2-logrotate:compress true
  pm2 set pm2-logrotate:workerInterval 3600
  pm2 set pm2-logrotate:rotateInterval "0 3 * * *"
  pm2 save
else
  echo "WARN: pm2 not found — skip logrotate"
fi

echo "==> Disk clean cron (3× daily)"
bash "$SCRIPT_DIR/install-disk-clean-cron.sh"

echo "==> Optional: nginx brotli (Ubuntu)"
if command -v apt-get >/dev/null 2>&1; then
  apt-get install -y nginx-module-brotli 2>/dev/null || echo "  brotli module not in apt — gzip only is fine"
fi

echo "==> journald limit (max 500M)"
mkdir -p /etc/systemd/journald.conf.d
cat > /etc/systemd/journald.conf.d/size-limit.conf << 'EOF'
[Journal]
SystemMaxUse=500M
RuntimeMaxUse=100M
MaxRetentionSec=7day
EOF
systemctl restart systemd-journald 2>/dev/null || true

echo "==> Server optimizations installed."
echo "    Audit disk: bash $SCRIPT_DIR/disk-audit.sh"
