#!/usr/bin/env bash
# Install disk-clean-all-sites.sh and cron (3× daily). Run as root on the VPS.
set -euo pipefail

SCRIPT_SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/disk-clean-all-sites.sh"
INSTALL_PATH="/usr/local/bin/disk-clean-all-sites.sh"
CRON_FILE="/etc/cron.d/disk-clean-all-sites"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Run as root: sudo bash $0"
  exit 1
fi

install -m 0755 "$SCRIPT_SRC" "$INSTALL_PATH"
touch /var/log/disk-clean-all-sites.log
chmod 644 /var/log/disk-clean-all-sites.log

# 3× daily: 04:00, 12:00, 20:00 server local time (adjust if you use UTC)
cat > "$CRON_FILE" << 'EOF'
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
# Disk cleanup for all sites under /var/www
0 4,12,20 * * * root /usr/local/bin/disk-clean-all-sites.sh >> /var/log/disk-clean-all-sites.log 2>&1
EOF
chmod 644 "$CRON_FILE"

echo "Installed: $INSTALL_PATH"
echo "Cron:      $CRON_FILE (04:00, 12:00, 20:00 daily)"
echo ""
echo "Test once (dry run):"
echo "  DRY_RUN=1 /usr/local/bin/disk-clean-all-sites.sh"
echo ""
echo "Test once (live):"
echo "  /usr/local/bin/disk-clean-all-sites.sh"
echo ""
echo "Tail log:"
echo "  tail -f /var/log/disk-clean-all-sites.log"
