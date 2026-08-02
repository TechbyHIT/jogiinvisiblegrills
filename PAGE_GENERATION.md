# Page Generation

## How pages are created

Pages are **not** individual static files for every URL. Instead:

1. Entity records live in `src/data/`.
2. `generateRegistryPages()` in `registry.ts` iterates combinations.
3. `buildPageRecord()` computes SEO metadata and quality metrics.
4. Results are cached in memory via `getAllPages()`.

## Combination matrix

| Page type | Formula |
|-----------|---------|
| core | `STATIC_ROUTES` (21 routes) |
| service | 1 per published service |
| location | 1 per served location |
| area | 1 per served area |
| service-location | served locations × services |
| service-area | served areas × services |
| solution | 1 per problem |
| property-type-service | property types × suitable services |
| guide | 1 per guide |
| blog | 1 per blog post |

## Scaling to 50k–400k+ records

Adding more areas and localities multiplies combinations **without creating physical files**:

```
service-area pages = served areas × published services
service-location pages = served cities × published services
```

Example growth:

| Areas | Services | Service-area pages |
|-------|----------|-------------------|
| 50 | 10 | 500 |
| 500 | 10 | 5,000 |
| 4,000 | 10 | 40,000 |

The registry generates records programmatically. Memory caching handles runtime access; audit scripts paginate via `paginatePages`.

## Why we do NOT publish thin doorway pages

Mass-generated locality pages often fail:

- Word count minimums (900–1000 words for local service pages)
- Similarity thresholds (duplicate content detection)
- `localDataVerified` requirement

**Intentional policy:** combinations exist in the registry for planning and batch tooling, but only pages with genuine unique content and verified local data receive `published` + indexable status.

Use `npm run pages:publish` to review indexable batches before sitemap inclusion.

## CLI tools

```bash
# Export page records
npm run pages:create -- --type=service-location --limit=1000

# Count all pages
npm run pages:count

# Publish batch plan
npm run pages:publish -- --batch-size=500
```

## Adding scale safely

1. Add area/location records with verified facts.
2. Expand `content-modules.ts` with locality-specific paragraphs.
3. Run `content:audit` and `duplicates:audit`.
4. Apply `publishing-overrides.ts` only after live page review.
5. Regenerate sitemaps.

See [PUBLISHING_WORKFLOW.md](./PUBLISHING_WORKFLOW.md).
