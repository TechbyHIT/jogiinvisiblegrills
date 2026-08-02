# Jogendhra Safety Nets

Professional invisible grills, balcony safety nets, mosquito nets and related home safety installations across Visakhapatnam, Bangalore, Mysore and other served localities.

## Stack

- **Next.js 16** (App Router)
- **TypeScript** + **Tailwind CSS 4**
- **File-based content** — no database or Prisma
- **Vitest** (unit) + **Playwright** (e2e)

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in contact details
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript check |
| `npm run test` | Unit tests (Vitest) |
| `npm run test:e2e` | E2E tests (requires running server) |
| `npm run pages:count` | Page/indexable counts |
| `npm run seo:audit` | SEO indexability audit |
| `npm run sitemaps:generate` | Sitemap summary report |

See [PUBLISHING_WORKFLOW.md](./PUBLISHING_WORKFLOW.md) and [SEO_AUDIT_GUIDE.md](./SEO_AUDIT_GUIDE.md) for audit scripts.

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — system overview
- [DATABASE_ARCHITECTURE.md](./DATABASE_ARCHITECTURE.md) — file-based data layer
- [SEO_ARCHITECTURE.md](./SEO_ARCHITECTURE.md) — metadata, indexability, sitemaps
- [CONTENT_GUIDELINES.md](./CONTENT_GUIDELINES.md) — writing standards
- [PAGE_GENERATION.md](./PAGE_GENERATION.md) — how pages are generated at scale
- [KEYWORD_CLUSTER_MAP.md](./KEYWORD_CLUSTER_MAP.md) — keyword dump → canonical URL mapping
- [DEPLOYMENT.md](./DEPLOYMENT.md) — production deployment

## Project structure

```
src/
  app/           # Next.js routes
  components/    # UI components
  config/        # Site, SEO, business config
  data/          # Services, locations, guides (source of truth)
  lib/           # SEO, pages registry, schema, content assembly
scripts/         # Audit and publishing CLI tools
reports/         # JSON audit outputs (gitignored)
```

## Environment

Copy `.env.example` to `.env.local`. Required variables include `NEXT_PUBLIC_SITE_URL`, contact details, `ADMIN_PASSWORD`, and `REVALIDATE_SECRET`.
