# Architecture

## Overview

Jogendhra Safety Nets is a **file-based Next.js 16** marketing site. All content, page metadata, and publishing state live in TypeScript data files under `src/data/`. There is no database.

## Layers

```
src/data/          → Source records (services, locations, guides)
src/lib/content/   → Content assembly (word count, sections)
src/lib/pages/     → Page registry, build-page-record, publishing
src/lib/seo/       → Indexability, canonicals, quality scoring
src/app/           → Route handlers that render assembled content
scripts/           → Audits and publishing batch tools
```

## Page lifecycle

1. **Entity records** are defined in `src/data/` (e.g. `initial-services.ts`).
2. **`buildPageRecord`** assembles content, computes word count, quality score, and similarity.
3. **`registry.ts`** generates all page combinations (core + dynamic permutations).
4. **`publishing-overrides.ts`** applies Phase-1 quality flags per path.
5. **`isPageIndexable`** gates sitemap inclusion and `robots` meta (unchanged contract).
6. **App routes** fetch published pages via `getPublishedPageByPath`.

## Caching

The page registry memoises generated pages in memory. Call `resetPageRegistryCache()` in tests after data changes.

## Admin

Protected routes under `/admin/` provide publishing dashboards and audit views. Auth uses `ADMIN_PASSWORD` from environment.

## Key design decisions

- **No thin doorway pages** — locality × service combinations exist in the registry but remain noindex until content and quality gates pass.
- **Measurement-led content** — word counts derive from assembled paragraphs, not metadata alone.
- **Indian English** — content modules and guides target Andhra Pradesh homeowners.

See also: [DATABASE_ARCHITECTURE.md](./DATABASE_ARCHITECTURE.md), [SEO_ARCHITECTURE.md](./SEO_ARCHITECTURE.md).
