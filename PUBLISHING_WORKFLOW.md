# Publishing Workflow

## Overview

Publishing is **gate-based**, not "publish everything in the registry."

## Indexability gates

All gates in `isPageIndexable` must pass. See [SEO_ARCHITECTURE.md](./SEO_ARCHITECTURE.md).

## Phase-1 launch set

Phase-1 indexable pages typically include:

- Core routes (home, about, contact, services list, locations list, guides)
- All service detail pages
- All location hub pages
- Visakhapatnam service-location pages (all services)
- Guide detail pages

Configured in `src/data/publishing-overrides.ts`.

## Workflow steps

### 1. Content readiness

```bash
npm run content:audit
npm run placeholder:audit
```

Fix word count deficits and remove placeholders.

### 2. Quality audit

```bash
npm run seo:audit
npm run duplicates:audit
npm run links:audit
npm run schema:audit
```

Review JSON reports in `reports/`.

### 3. Page counts

```bash
npm run pages:count
```

Confirm indexable count matches expectations.

### 4. Batch publishing plan

```bash
npm run pages:publish -- --batch-size=500
```

Produces `reports/publish-pages.json` with indexable path batches.

### 5. Noindex underperformers

```bash
npm run pages:noindex -- --quality-below=80
```

Identifies pages that should remain or move to `noindex`.

### 6. Sitemap generation

```bash
npm run sitemaps:generate
```

Writes `reports/sitemap-summary.json`.

### 7. Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md). After deploy, submit sitemap in Search Console.

## Admin dashboard

Visit `/admin/publishing/` (requires `ADMIN_PASSWORD`) for a live view of indexable vs blocked pages.

## Rules

- Do **not** modify `isPageIndexable` to bypass gates.
- Do **not** set `localDataVerified: true` without human review.
- Expand content or overrides — never fake word counts.
