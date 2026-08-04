# Automatic disk cleanup (30+ sites on one VPS)

> Full playbook: [SERVER-PRODUCTION.md](./SERVER-PRODUCTION.md)

One cron job cleans **all** project folders under `/var/www` — safe caches only (not production standalone, not `.env`, not `public/` uploads).

## What gets cleaned (every site)

| Target | Safe? |
|--------|--------|
| `/.next/cache` | Yes — rebuilt on build |
| `/node_modules/.cache` | Yes |
| `.turbo`, `.eslintcache` | Yes |
| `/.next/diagnostics`, `/.next/trace` | Yes (when `standalone` exists) |
| PM2 logs older than 7 days | Yes |
| PM2 logs **>100MB** | Truncated (not deleted) |
| `journalctl` older than 4 days | Yes |
| `apt-get clean`, `npm cache clean` | Yes |

**Not deleted:** `.next/standalone`, `node_modules` (full), `.env*`, git, `public/` images.

## Install on the server (once)

From any deployed repo copy (e.g. Jogi), or copy the two scripts manually:

```bash
cd /var/www/jogiinvisiblegrills.in
git pull

sudo bash deploy/server/install-disk-clean-cron.sh
```

Schedule: **3× per day** at **04:00, 12:00, 20:00** (server local time).

Edit times:

```bash
sudo nano /etc/cron.d/disk-clean-all-sites
```

## Test

```bash
# Preview actions (no deletes)
sudo DRY_RUN=1 /usr/local/bin/disk-clean-all-sites.sh

# Run now
sudo /usr/local/bin/disk-clean-all-sites.sh

sudo tail -50 /var/log/disk-clean-all-sites.log
df -h /var/www
```

## All 30 websites

No per-site setup. Any directory directly under `/var/www/` is scanned:

```
/var/www/jogiinvisiblegrills.in/
/var/www/devasafetynets.com/
/var/www/…/
```

Optional env overrides in cron:

```cron
0 4,12,20 * * * root WEB_ROOT=/var/www PM2_LOG_MAX_DAYS=5 /usr/local/bin/disk-clean-all-sites.sh >> /var/log/disk-clean-all-sites.log 2>&1
```

## Extra savings (manual / deploy policy)

After each site’s `npm run build:standalone`, you may remove `node_modules` on small VPS disks and run `npm ci` only on the next deploy (already noted in `DEPLOYMENT-PM2.md`). The cron job does **not** remove `node_modules` automatically.

## Uninstall

```bash
sudo rm -f /etc/cron.d/disk-clean-all-sites /usr/local/bin/disk-clean-all-sites.sh
```
