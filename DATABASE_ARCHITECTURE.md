# Database Architecture (File-Based)

This project **does not use Postgres, Prisma, or any external database**. All persistence is file-based TypeScript modules committed to the repository.

## Why file-based?

- **Simplicity** — no migrations, connection strings, or ORM overhead for a content-heavy marketing site.
- **Version control** — content changes are reviewable in pull requests.
- **Build-time generation** — page records are computed at runtime from data files with in-memory caching.
- **Scale without DB rows** — the registry can combine services × locations × areas programmatically without one file per URL.

## Data files

| File | Contents |
|------|----------|
| `src/data/initial-services.ts` | Service definitions |
| `src/data/initial-locations.ts` | City/town records |
| `src/data/initial-areas.ts` | Locality records |
| `src/data/guides.ts` | Long-form guides |
| `src/data/blog-posts.ts` | Blog articles |
| `src/data/problems.ts` | Solution/problem pages |
| `src/data/property-types.ts` | Property type combinations |
| `src/data/content-modules.ts` | Reusable paragraph modules |
| `src/data/publishing-overrides.ts` | Per-path publishing flags |

## Page records vs entity records

- **Entity records** hold business data (service benefits, location facts).
- **Page records** (`PageRecord` type) add SEO metadata, word counts, quality scores, and indexability flags.
- **`buildPageRecord`** bridges entities to pages.
- **`registry.ts`** is the virtual "database query layer" — it generates all combinations and caches results.

## Publishing state

Publication fields live on entity records (`publicationStatus`, `allowIndexing`, `contentReviewed`) and page records. Overrides in `publishing-overrides.ts` patch specific paths without duplicating entity data.

## Reports directory

Audit scripts write JSON to `reports/`. These are generated artefacts, not source of truth.

## Future migration path

If volume exceeds comfortable Git-based editing:

1. Export registry pages via `scripts/create-page-records.ts`.
2. Introduce a CMS or edge KV store as a **read layer** while keeping the same `PageRecord` shape.
3. Keep `isPageIndexable` gates unchanged.

For current scale (hundreds to low thousands of indexable pages), file-based storage is sufficient.
