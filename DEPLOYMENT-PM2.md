# PM2 + nginx (no Docker) — jogiinvisiblegrills.in

## Server paths

This repo documents two VPS layouts:

| Layout | Site path | PM2 config |
|--------|-----------|------------|
| Legacy | `/var/www/jogiinvisiblegrills.in` | `ecosystem.config.cjs` in repo |
| **ap-sites multisite** | `/srv/sites/jogiinvisiblegrills/current` | `/etc/ap-sites/ecosystem.multisite.config.cjs` |

If `cd /var/www/jogiinvisiblegrills.in` fails, you are on **ap-sites**. Use:

```bash
pm2 describe jogiinvisiblegrills | grep -E "exec cwd|script path|PORT"
ls -la /srv/sites/jogiinvisiblegrills/current
cat /etc/ap-sites/ecosystem.multisite.config.cjs | grep -A20 jogi
```

Deploy via your multisite tool from `~/ap-all-areas` (same as `hiranaya-enterprises`). **Do not** run `pm2 start ecosystem.config.cjs` from `ap-all-areas` — that starts the wrong app.

After deploy, set Jogi **PORT=3002** in `/etc/ap-sites/ecosystem.multisite.config.cjs`, then:

```bash
pm2 reload /etc/ap-sites/ecosystem.multisite.config.cjs --only jogiinvisiblegrills
curl -sS http://127.0.0.1:3002/api/site-identity/
```

Nginx `proxy_pass` must match that port. Copy vhost from the site release:

```bash
JOGI=$(readlink -f /srv/sites/jogiinvisiblegrills/current 2>/dev/null || echo /srv/sites/jogiinvisiblegrills/current)
sudo cp "$JOGI/deploy/nginx-jogiinvisiblegrills.conf" /etc/nginx/sites-available/jogiinvisiblegrills.in
sudo nginx -t && sudo systemctl reload nginx
```

---

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
pm2 delete jogi-invisible-grills 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save
```

**502 Bad Gateway** from nginx means nothing is listening on **3002** (crashed app, failed build, or wrong PM2 `cwd`). PM2 must run **`server.js` from `.next/standalone/`** (see `ecosystem.config.cjs`).

```bash
cd /var/www/jogiinvisiblegrills.in
test -f .next/standalone/server.js || echo "BUILD MISSING — run npm run build:standalone"

export NODE_OPTIONS=--max-old-space-size=8192
npm run build:standalone

pm2 delete jogi-invisible-grills 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 logs jogi-invisible-grills --lines 40 --nostream

ss -tlnp | grep 3002
curl -sS http://127.0.0.1:3002/api/site-identity/
```

If PM2 shows **errored** or **restart loop**, read logs for OOM or missing `server.js`. Increase `max_memory_restart` in `ecosystem.config.cjs` if the VPS has RAM headroom.

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
| `https://www.jogiinvisiblegrills.in/*` | proxied to PM2 on port **3002** |

**Symptom:** `curl: (60) SSL: no alternative certificate subject name matches target host name 'www.jogiinvisiblegrills.in'` — nginx is presenting a **different site’s certificate** (common on shared VPS) or a cert that only covers the apex name.

Diagnose:

```bash
echo | openssl s_client -connect www.jogiinvisiblegrills.in:443 -servername www.jogiinvisiblegrills.in 2>/dev/null | openssl x509 -noout -subject -ext subjectAltName

sudo grep -E "ssl_certificate|server_name" /etc/nginx/sites-available/jogiinvisiblegrills.in
sudo certbot certificates | grep -A5 jogiinvisiblegrills
```

Fix — issue one cert for **both** names and point nginx at it:

```bash
sudo certbot certonly --nginx -d jogiinvisiblegrills.in -d www.jogiinvisiblegrills.in
# If a cert already exists for the apex only, add: --expand

sudo cp /var/www/jogiinvisiblegrills.in/deploy/nginx-jogiinvisiblegrills.conf /etc/nginx/sites-available/jogiinvisiblegrills.in
sudo ln -sf /etc/nginx/sites-available/jogiinvisiblegrills.in /etc/nginx/sites-enabled/jogiinvisiblegrills.in
sudo nginx -t && sudo systemctl reload nginx

curl -sS https://www.jogiinvisiblegrills.in/api/site-identity/
```

**Still `curl: (60)`?** Copying only to `sites-available` is not enough if the symlink is missing, or Let’s Encrypt files do not exist yet:

```bash
ls -la /etc/nginx/sites-enabled/jogiinvisiblegrills.in
sudo ls /etc/letsencrypt/live/jogiinvisiblegrills.in/
echo | openssl s_client -connect www.jogiinvisiblegrills.in:443 -servername www.jogiinvisiblegrills.in 2>/dev/null \
  | openssl x509 -noout -subject -ext subjectAltName
sudo nginx -T 2>/dev/null | grep -B2 -A25 'server_name www.jogiinvisiblegrills.in'
```

The openssl output must list `DNS:www.jogiinvisiblegrills.in`. The `nginx -T` block must show `proxy_pass http://127.0.0.1:3002` and cert paths under `live/jogiinvisiblegrills.in/`.

If openssl shows **`CN = devasafetynets.com`** (or another domain) for `www.jogiinvisiblegrills.in`, nginx is using **Deva’s default HTTPS vhost** because Jogi’s **443 `server_name` block is missing, misconfigured, or not enabled** — even when Let’s Encrypt already has a Jogi certificate (`certbot` may say “not yet due for renewal”).

Fix:

```bash
sudo certbot certificates | grep -A6 jogiinvisiblegrills
grep -E "listen|server_name|ssl_certificate" /etc/nginx/sites-available/jogiinvisiblegrills.in
sudo ln -sf /etc/nginx/sites-available/jogiinvisiblegrills.in /etc/nginx/sites-enabled/jogiinvisiblegrills.in
sudo cp /var/www/jogiinvisiblegrills.in/deploy/nginx-jogiinvisiblegrills.conf /etc/nginx/sites-available/jogiinvisiblegrills.in
sudo nginx -t && sudo systemctl reload nginx

sudo nginx -T 2>/dev/null | grep -B1 -A28 'server_name www.jogiinvisiblegrills.in'
echo | openssl s_client -connect www.jogiinvisiblegrills.in:443 -servername www.jogiinvisiblegrills.in 2>/dev/null \
  | openssl x509 -noout -subject -ext subjectAltName
```

`nginx -T` must show `ssl_certificate .../live/jogiinvisiblegrills.in/` and `proxy_pass http://127.0.0.1:3002`. Only if `certbot certificates` lists **apex only** (no `www`), force an expand:

```bash
sudo certbot certonly --nginx --expand --force-renewal \
  -d jogiinvisiblegrills.in -d www.jogiinvisiblegrills.in --non-interactive --agree-tos
```

Optional: remove `default_server` from Deva’s `listen 443` so a missing vhost does not show the wrong brand’s certificate:

```bash
grep -rn default_server /etc/nginx/sites-enabled/
```

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

After HTTPS is fixed, verify child sitemaps return XML (not 404/SSL error):

```bash
curl -sS -o /dev/null -w "%{http_code}" https://www.jogiinvisiblegrills.in/sitemaps/core.xml
curl -sS https://www.jogiinvisiblegrills.in/sitemaps/core.xml | head -5
```

Search Console **“Couldn’t fetch”** on child sitemaps is usually **invalid SSL** (wrong certificate) or **404** from URL/trailing-slash mismatch. Re-submit the sitemap index after deploy.

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
- [ ] `pm2 logs jogi-invisible-grills` — no crash loop
- [ ] Site identity check (must show **Jogi**, not another brand):

```bash
curl -s http://127.0.0.1:3002/api/site-identity/
# {"brand":"Jogi Invisible Grills","deployMarker":"jogi-invisible-grills-next",...}

curl -s https://www.jogiinvisiblegrills.in/api/site-identity/
```

If the public URL returns another company (e.g. Deva Safety Nets) or `deployMarker` is missing, nginx is proxying to the **wrong port** or the wrong PM2 app — fix nginx `proxy_pass` to **3002** and ensure this repo’s PM2 process is running.

## 7. Wrong site on this domain (troubleshooting)

Symptom: `https://jogiinvisiblegrills.in/` shows **Deva Safety Nets**, Kerala content, or another project.

Cause: On a shared VPS, **port 3000** is often already used by another Next.js site. If nginx `proxy_pass` points to 3000, this domain serves that other app.

Fix on the server:

```bash
cd /var/www/jogiinvisiblegrills.in
git pull
npm run build:standalone

# Stop old PM2 name if present
pm2 delete jogendhra-invisible-grills 2>/dev/null || true

pm2 start ecosystem.config.cjs   # listens on 127.0.0.1:3002
pm2 save

curl -s http://127.0.0.1:3002/api/site-identity/ | head
# must include "Jogi Invisible Grills"

sudo cp deploy/nginx-jogiinvisiblegrills.conf /etc/nginx/sites-available/jogiinvisiblegrills.in
# confirm proxy_pass http://127.0.0.1:3002;
sudo nginx -t && sudo systemctl reload nginx

curl -s https://www.jogiinvisiblegrills.in/api/site-identity/
```

Ensure no other nginx `server` block uses `default_server` on 443 with the wrong `proxy_pass` for `jogiinvisiblegrills.in`. Each domain needs its own `server_name` and port.

## 8. nginx `-t` warnings (shared VPS)

If reload shows **`protocol options redefined for 0.0.0.0:443`** for `deva-safety-nets`, `hiranyaenterprises.in`, etc.: multiple site configs each use `listen 443 ssl http2`. Nginx picks one set of options; **syntax is still OK** and the site can work. To reduce noise, use the same `listen` pattern everywhere (e.g. `listen 443 ssl;` without `http2` on each vhost) or ignore the warn if `nginx: configuration file ... test is successful`.

If you see **`conflicting server name "saidurgainvisiblegrills.in" ... ignored`**: two enabled configs define the same `server_name`. On this server that is usually **`saidurga`** and **`saidurgainvisiblegrills.in`** both enabled:

```bash
grep server_name /etc/nginx/sites-available/saidurga /etc/nginx/sites-available/saidurgainvisiblegrills.in
# Disable the older duplicate (keep saidurgainvisiblegrills.in):
sudo rm /etc/nginx/sites-enabled/saidurga
sudo nginx -t && sudo systemctl reload nginx
```

Confirm Jogi is wired correctly (independent of Deva on port 3000):

```bash
grep -r "server_name.*jogiinvisiblegrills" /etc/nginx/sites-enabled/
grep "proxy_pass" /etc/nginx/sites-available/jogiinvisiblegrills.in
# proxy_pass http://127.0.0.1:3002;

pm2 list
pm2 logs jogi-invisible-grills --lines 30 --nostream

curl -sS http://127.0.0.1:3002/api/site-identity/
curl -sS https://www.jogiinvisiblegrills.in/api/site-identity/
```

If localhost returns nothing or connection refused, the app is not listening on **3002** — run `pm2 start ecosystem.config.cjs` after `npm run build:standalone`. This project uses **`trailingSlash: true`**, so use **`/api/site-identity/`** (with trailing slash) in curl.

See also [DEPLOYMENT.md](./DEPLOYMENT.md), [SEARCH_CONSOLE_SETUP.md](./SEARCH_CONSOLE_SETUP.md), and [SERVER-DISK-CLEANUP.md](./deploy/SERVER-DISK-CLEANUP.md) (automatic cache cleanup for all `/var/www` sites).
