# PM2 + nginx (no Docker) — e.g. jogendhrainvisiblegrills.in

## Server requirements

- Ubuntu 22.04+ (or similar)
- Node.js **20 LTS**
- PM2: `npm i -g pm2`
- nginx

## 1. Clone and env

```bash
cd /var/www/jogiinvisiblegrills.in
git pull

npm run env:setup
```

This copies `.env.example` → `.env.local` once and auto-generates `ADMIN_PASSWORD` and `REVALIDATE_SECRET`. **No manual typing** — site URL, phone, WhatsApp, and email are already set in `.env.example`.

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

## 4. nginx (reverse proxy)

```nginx
server {
    listen 80;
    server_name jogendhrainvisiblegrills.in www.jogendhrainvisiblegrills.in;
    return 301 https://www.jogendhrainvisiblegrills.in$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.jogendhrainvisiblegrills.in;

    # ssl_certificate /etc/letsencrypt/live/.../fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/.../privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 5. Sitemap checklist (Search Console)

After deploy, verify:

| URL | Expected |
|-----|----------|
| `/robots.txt` | `Sitemap: https://www…/sitemap.xml` |
| `/sitemap.xml` | **`<sitemapindex>`** listing child sitemaps |
| `/sitemaps/core.xml` | `<urlset>` with core pages |
| `/sitemaps/programmatic-1.xml` | `<urlset>` (≤ 40k URLs) |

```bash
curl -sI https://www.jogendhrainvisiblegrills.in/sitemap.xml | head
curl -s https://www.jogendhrainvisiblegrills.in/sitemap.xml | head -20
```

Submit **only** `/sitemap.xml` in Google Search Console (sitemap index).

Local audit:

```bash
npm run sitemaps:generate
npm run inventory:summary
```

## 6. Post-deploy

- [ ] Homepage canonical uses `NEXT_PUBLIC_SITE_URL`
- [ ] `/sitemap.xml` is a sitemap index (not a urlset of `.xml` links)
- [ ] No 404 on `/sitemaps/programmatic-11.xml` (shard count matches inventory)
- [ ] Contact form + admin login
- [ ] `pm2 logs jogendhra-invisible-grills` — no crash loop

See also [DEPLOYMENT.md](./DEPLOYMENT.md) and [SEARCH_CONSOLE_SETUP.md](./SEARCH_CONSOLE_SETUP.md).
