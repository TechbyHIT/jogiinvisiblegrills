#!/usr/bin/env bash
# Install disk-guard.sh + systemd timer (checks every 5 minutes). Run as root.
#
#   sudo bash install-disk-guard.sh
#   sudo THRESHOLD_GB=160 TARGET_GB=150 bash install-disk-guard.sh
set -euo pipefail

THRESHOLD_GB="${THRESHOLD_GB:-160}"
TARGET_GB="${TARGET_GB:-150}"
KEEP_RELEASES="${KEEP_RELEASES:-2}"
INTERVAL="${INTERVAL:-5min}"

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/disk-guard.sh"
BIN="/usr/local/bin/disk-guard.sh"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Run as root: sudo bash $0" >&2
  exit 1
fi

install -m 0755 "$SRC" "$BIN"
touch /var/log/disk-guard.log
chmod 644 /var/log/disk-guard.log

cat >/etc/systemd/system/disk-guard.service <<EOF
[Unit]
Description=Disk guard - clean caches/old releases when disk crosses threshold
After=network.target

[Service]
Type=oneshot
Environment=THRESHOLD_GB=${THRESHOLD_GB}
Environment=TARGET_GB=${TARGET_GB}
Environment=KEEP_RELEASES=${KEEP_RELEASES}
Environment=SITES_ROOT=/srv/sites
Environment=WEB_ROOT=/var/www
ExecStart=${BIN}
# Never let cleanup starve the running sites
Nice=10
IOSchedulingClass=idle
EOF

cat >/etc/systemd/system/disk-guard.timer <<EOF
[Unit]
Description=Run disk guard every ${INTERVAL}

[Timer]
OnBootSec=2min
OnUnitActiveSec=${INTERVAL}
AccuracySec=30s
Unit=disk-guard.service

[Install]
WantedBy=timers.target
EOF

# Keep journald itself from eating the disk
mkdir -p /etc/systemd/journald.conf.d
cat >/etc/systemd/journald.conf.d/99-size.conf <<'EOF'
[Journal]
SystemMaxUse=200M
SystemMaxFileSize=50M
MaxRetentionSec=3day
EOF
systemctl restart systemd-journald 2>/dev/null || true

systemctl daemon-reload
systemctl enable --now disk-guard.timer

echo "Installed: $BIN"
echo "Trigger:   used >= ${THRESHOLD_GB}G  ->  clean down to ${TARGET_GB}G"
echo "Timer:     every ${INTERVAL} (systemctl list-timers disk-guard.timer)"
echo
echo "Dry run now:  sudo FORCE=1 DRY_RUN=1 $BIN && sudo tail -40 /var/log/disk-guard.log"
echo "Force clean:  sudo FORCE=1 $BIN && sudo tail -40 /var/log/disk-guard.log"
