# Production VPS playbook — 50+ Next.js sites, minimal footprint

Ubuntu 24.04 · Node LTS · PM2 · Nginx · 200 GB SSD · programmatic SEO (millions of URLs via ISR/sitemaps, not millions of static files).

## Golden rules

| Do | Don't |
|----|--------|
| `output: "standalone"` + PM2 from `.next/standalone/` | Run `next start` from full repo |
| `npm ci` → build → **prune** → PM2 | Keep `node_modules` + full `.next` after deploy |
| One PM2 fork per site, unique **PORT** | cluster mode unless traffic requires it |
| Static sitemap XML at build (`sitemaps:export`) | Pre-render 400k+ HTML pages at build |
| 3× daily `disk-clean-all-sites.sh` | Unlimited PM2 / journal logs |

**Expected savings per site after prune:** ~300–900 MB (`node_modules`) + ~50–200 MB (`.next` build artifacts). **50 sites ≈ 15–50 GB** recovered.

---

## One-time server setup (all sites)

```bash
cd /var/www/jogiinvisiblegrills.in && git pull
sudo bash deploy/server/install-server-optimizations.sh
```

Installs:

- **PM2 logrotate** — 10 MB max, 3 files, gzip
- **Disk clean cron** — 04:00, 12:00, 20:00
- **journald** cap — 500 MB
- Optional **brotli** nginx module

Copy nginx performance snippet to the server:

```bash
sudo cp deploy/nginx-nextjs-performance.conf /etc/nginx/snippets/nextjs-proxy.conf
```

Include inside each vhost `server { ... }`:

```nginx
include /etc/nginx/snippets/nextjs-proxy.conf;
```

---

## Per-site deploy (template)

```bash
sudo bash deploy/server/site-deploy.sh /var/www/jogiinvisiblegrills.in jogi-invisible-grills 3002
```

What `build:standalone` does:

1. `next build` — standalone, no browser source maps, low build concurrency
2. `export-static-sitemaps.ts` — XML to `public/sitemaps/` (Google-friendly)
3. `prepare-standalone.cjs` — copy `public/`, `.next/static/`, `.env.local`
4. `post-deploy-prune.cjs` — remove `.next/cache`, `.next/server`, maps; optional `node_modules` when `PRUNE_NODE_MODULES=1`

PM2 **must** use:

```js
cwd: ".next/standalone",
script: "server.js",
instances: 1,
exec_mode: "fork",
```

---

## Port map (50 sites)

Assign ports **3000–3049** (or 3000–3099). Document in `/root/site-ports.csv`:

```text
jogiinvisiblegrills.in,3002,jogi-invisible-grills
devasafetynets.com,3000,deva-safety-nets
```

Never share a port between sites.

---

## Programmatic SEO at scale

- **Runtime:** ISR / on-demand (`dynamicParams: true`, `revalidate: 86400`)
- **Build:** Pre-render **service layer only** (~98 URLs), not city×area×intent matrix
- **Sitemaps:** Static XML shards (40k URLs/file) served by nginx from `standalone/public/sitemaps/`
- **SEO:** Unchanged — all indexable URLs remain in sitemaps

---

## Automatic disk cleaning

See [SERVER-DISK-CLEANUP.md](./SERVER-DISK-CLEANUP.md).

Audit anytime:

```bash
sudo bash deploy/server/disk-audit.sh
```

Aggressive pass (removes `node_modules` where standalone exists):

```bash
sudo AGGRESSIVE=1 /usr/local/bin/disk-clean-all-sites.sh
```

---

## Package optimization (deploy time)

On each deploy:

```bash
npm ci              # full deps required for build
npm run build:standalone
# post-deploy-prune removes node_modules when PRUNE_NODE_MODULES=1
```

Optional before build on tight disk:

```bash
npm ci --prefer-offline --no-audit --no-fund
npm dedupe
```

Do **not** use `--omit=dev` before `next build` — TypeScript/eslint tooling may be required.

---

## What stays on disk per site (minimal)

```
/var/www/example.com/
  .next/standalone/     ← PM2 runtime (~80–150 MB typical)
  .env.local
  ecosystem.config.cjs
  public/               ← source assets (rebuild)
  package.json
  package-lock.json
  src/                  ← git pull deploys (needed for next build)
```

Removed after production build (safe):

- `node_modules/`
- `.next/cache`, `.next/server`, `.next/static` (copied into standalone)
- `*.map` in standalone

---

## Monitoring

```bash
df -h /var/www
sudo bash deploy/server/disk-audit.sh
pm2 list
pm2 monit
du -sh /var/www/*/.next/standalone
```

---

## Safety

Never auto-delete:

- `.next/standalone/`
- `.env.local`
- `public/` user uploads
- nginx / certbot configs

Never disable sitemaps, canonical URLs, or indexable routes for “space savings.”
