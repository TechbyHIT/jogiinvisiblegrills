# Automatic disk guard — clean at 160 GB, zero downtime

Checks disk every **5 minutes**. Does nothing while usage is below the threshold. When **used disk crosses 160 GB**, it cleans in escalating levels until usage is back under **150 GB**.

No site is ever stopped, restarted or reloaded.

## Never deletes a live release's runtime

`is_protected()` refuses anything that **is**, **contains**, or **lives inside** a
release PM2 is currently serving. The "inside" case is the important one: deleting
`releases/<ts>/node_modules` on a live site causes `Cannot find module 'next'`,
a PM2 crash-loop and a **502** — with the release directory still looking healthy.

Known-regenerable caches are the documented exception and are passed `cache` mode
so they can still be cleared inside a live release: `.next/cache`,
`node_modules/.cache`, `.turbo`, `.eslintcache`.

Verify the logic any time you touch it:

```bash
bash scripts/test-disk-guard-protection.sh
```

## Install (once, as root)

```bash
sudo bash /srv/sites/jogiinvisiblegrills/current/deploy/server/install-disk-guard.sh
```

Custom thresholds:

```bash
sudo THRESHOLD_GB=160 TARGET_GB=150 KEEP_RELEASES=2 bash install-disk-guard.sh
```

## How zero downtime is guaranteed

Before deleting anything, the guard builds a protected list from `pm2 jlist` (`pm_cwd`, `pm_exec_path`) plus every site's `current` symlink target, and resolves symlinks. Any path that is — or contains — a live path is skipped and logged as `SKIP (in use)`.

The guard never runs `pm2 restart`, `pm2 reload`, `systemctl restart nginx`, or touches `.env`, `public/`, or the live release.

## Cleaning levels

| Level | Removes | Site impact |
|-------|---------|-------------|
| 1 | `.next/cache`, `node_modules/.cache`, `.turbo`, `.eslintcache`, stale `/tmp/*-build-*`, PM2 logs >50 MB (truncated), rotated logs >3 days, journal >200 MB, apt + npm cache | None |
| 2 | Old releases (keeps newest `KEEP_RELEASES` + live), `node_modules` where a standalone runtime exists | None — rebuilt on next deploy |
| 3 | All non-live releases, `shared/cache` ISR contents, logs >5 MB truncated, journal >50 MB, `docker system prune` | ISR pages regenerate on first request |

It stops as soon as usage drops below `TARGET_GB`, so level 3 only runs in a real emergency.

## Verify

```bash
systemctl list-timers disk-guard.timer
sudo FORCE=1 DRY_RUN=1 /usr/local/bin/disk-guard.sh && sudo tail -40 /var/log/disk-guard.log
sudo FORCE=1 /usr/local/bin/disk-guard.sh && sudo tail -40 /var/log/disk-guard.log
df -h /
```

`DRY_RUN=1` lists what would be deleted without touching anything. `FORCE=1` ignores the threshold so you can test below 160 GB.

## Keeping usage low between triggers

| Practice | Saving |
|----------|--------|
| `npm run build:standalone` (prunes `node_modules`, `.next/server`, source maps) | ~300–900 MB per deploy |
| `KEEP_RELEASES=2` | one old release per site instead of many |
| `pm2-logrotate` + journald cap (installed by the script) | prevents slow log-driven fill |
| Sitemaps as static XML, pages via ISR | disk stays flat as URL count grows |

## Logs and uninstall

```bash
sudo tail -f /var/log/disk-guard.log

sudo systemctl disable --now disk-guard.timer
sudo rm -f /etc/systemd/system/disk-guard.{service,timer} /usr/local/bin/disk-guard.sh
sudo systemctl daemon-reload
```
