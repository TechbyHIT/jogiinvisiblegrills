# PM2 + nginx (no Docker) — jogiinvisiblegrills.in

## Server requirements

- Ubuntu 22.04+ (or similar)
- Node.js **20 LTS**
- PM2: `npm i -g pm2`
- nginx + certbot

## 1. Clone and env

```bash
cd /var/www/jogiinvisiblegrills.in
git pull

npm run env:setup
```

This copies `.env.example` → `.env.local` once and auto-generates `ADMIN_PASSWORD` and `REVALIDATE_SECRET`. **No manual typing** — site URL, phone, WhatsApp, and email are already set in `.env.example`.

Ensure production uses the **www** canonical URL:

```bash
grep NEXT_PUBLIC_SITE_URL .env.local
# NEXT_PUBLIC_SITE_URL=https://www.jogiinvisiblegrills.in
```

To view admin password after setup:

```bash
grep ADMIN_PASSWORD .env.local
```

Optional overrides only if needed:

```bash
nano .env.local
```

## 2. Build (standalone)

```bash
npm run env:setup
npm ci
# fallback if ci fails: npm install
export NODE_OPTIONS=--max-old-space-size=8192
npm run build:standalone
```

`build:standalone` runs `next build` (with `output: "standalone"`) and copies `public/` + `.next/static/` into `.next/standalone/`.

Optional — free disk after build on small VPS:

```bash
rm -rf node_modules
# Re-run npm ci before the next deploy build
```

## 3. PM2

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Multiple sites on one server: duplicate `ecosystem.config.cjs` with different `name`, `PORT` (3000, 3001, 3002…), and `cwd`.

Restart after deploy:

```bash
npm run build:standalone
pm2 restart jogendhra-invisible-grills
```

## 4. HTTPS + nginx

**Symptom:** `NET::ERR_CERT_COMMON_NAME_INVALID` on `https://jogiinvisiblegrills.in` (no www) — the certificate must list **both** `jogiinvisiblegrills.in` and `www.jogiinvisiblegrills.in`, and nginx must redirect apex → www.

Copy the site config from the repo:

```bash
sudo cp deploy/nginx-jogiinvisiblegrills.conf /etc/nginx/sites-available/jogiinvisiblegrills.in
sudo ln -sf /etc/nginx/sites-available/jogiinvisiblegrills.in /etc/nginx/sites-enabled/
```

Issue or expand the certificate (both hostnames):

```bash
sudo certbot certonly --nginx -d jogiinvisiblegrills.in -d www.jogiinvisiblegrills.in
# or renew / expand an existing cert:
sudo certbot certonly --nginx --expand -d jogiinvisiblegrills.in -d www.jogiinvisiblegrills.in
sudo nginx -t && sudo systemctl reload nginx
```

Canonical behavior:

| Request | Result |
|---------|--------|
| `http://jogiinvisiblegrills.in/*` | → `https://www.jogiinvisiblegrills.in/*` |
| `http://www.jogiinvisiblegrills.in/*` | → `https://www.jogiinvisiblegrills.in/*` |
| `https://jogiinvisiblegrills.in/*` | → `https://www.jogiinvisiblegrills.in/*` |
| `https://www.jogiinvisiblegrills.in/*` | proxied to PM2 on port 3000 |

Full reference: [deploy/nginx-jogiinvisiblegrills.conf](./deploy/nginx-jogiinvisiblegrills.conf).

## 5. Sitemap checklist (Search Console)

After deploy, verify:

| URL | Expected |
|-----|----------|
| `/robots.txt` | `Sitemap: https://www.jogiinvisiblegrills.in/sitemap.xml` |
| `/sitemap.xml` | **`<sitemapindex>`** listing child sitemaps |
| `/sitemaps/core.xml` | `<urlset>` with core pages |
| `/sitemaps/programmatic-1.xml` | `<urlset>` (≤ 40k URLs) |

```bash
curl -sI https://www.jogiinvisiblegrills.in/sitemap.xml | head
curl -s https://www.jogiinvisiblegrills.in/sitemap.xml | head -20
```

Submit **only** `https://www.jogiinvisiblegrills.in/sitemap.xml` in Google Search Console (URL-prefix property for `https://www.jogiinvisiblegrills.in/`).

Local audit:

```bash
npm run sitemaps:generate
npm run inventory:summary
```

## 6. Post-deploy

- [ ] Browser shows padlock on `https://www.jogiinvisiblegrills.in/`
- [ ] `https://jogiinvisiblegrills.in/` redirects to www (no cert error)
- [ ] Homepage canonical uses `https://www.jogiinvisiblegrills.in`
- [ ] `/sitemap.xml` is a sitemap index (not a urlset of `.xml` links)
- [ ] No 404 on programmatic sitemap shards
- [ ] Contact form + admin login
- [ ] `pm2 logs jogendhra-invisible-grills` — no crash loop

See also [DEPLOYMENT.md](./DEPLOYMENT.md) and [SEARCH_CONSOLE_SETUP.md](./SEARCH_CONSOLE_SETUP.md).
