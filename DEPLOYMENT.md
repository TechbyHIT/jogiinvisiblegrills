# Deployment

## Prerequisites

- Node.js 20+
- Environment variables from `.env.example`

## Build

```bash
npm ci
cp .env.example .env.local   # configure production values
npm run typecheck
npm run test
npm run build
```

## Environment variables

Production must set:

- `NEXT_PUBLIC_SITE_URL` — canonical domain with https
- Contact and social `NEXT_PUBLIC_*` values (no placeholders)
- `ADMIN_PASSWORD` — strong password for admin routes
- `REVALIDATE_SECRET` — for on-demand ISR revalidation API

## Hosting options

Compatible with Vercel, Netlify, or any Node.js host supporting Next.js 16.

### PM2 + nginx (VPS, no Docker)

For **jogiinvisiblegrills.in** and similar VPS setups, see **[DEPLOYMENT-PM2.md](./DEPLOYMENT-PM2.md)** — standalone build, PM2 on port 3000+, nginx reverse proxy, HTTPS (apex + www), and sitemap verification.

### Vercel (recommended)

1. Connect repository
2. Set environment variables in project settings
3. Deploy — build command: `npm run build`

## Post-deploy checklist

- [ ] Homepage loads with correct canonical domain
- [ ] `robots.txt` and sitemap accessible
- [ ] Admin login works
- [ ] Contact form submissions work
- [ ] Analytics tags fire (if configured)
- [ ] Run `npm run seo:audit` against production content if data changed

## Revalidation

Long-cache pages use `revalidate = 86400`. Trigger on-demand revalidation with `REVALIDATE_SECRET` when content files change between deploys.

## Reports

Audit reports in `reports/` are local dev artefacts — not deployed.

See [SEARCH_CONSOLE_SETUP.md](./SEARCH_CONSOLE_SETUP.md) after first deploy.
