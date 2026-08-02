# SEO Architecture

## Indexability contract

A page is indexable when **all** conditions in `isPageIndexable` pass:

- `publicationStatus === "published"`
- `allowIndexing === true`
- `qualityScore >= 80`
- `contentReviewed`, `localDataVerified`, metadata flags true
- `wordCount >= minimumRequiredWordCount`
- `similarityScore <= 0.7`

The function is intentionally strict and should not be modified to bypass gates.

## Word count targets

Defined in `src/config/seo.ts`:

| Page type | Minimum words |
|-----------|---------------|
| core | 400 |
| service | 1200 |
| location | 700 |
| service-location | 1000 |
| guide | 1500 |
| blog | 1200 |

Word counts are computed from **assembled body content** via `countWordsInFields`.

## Quality score

`computeQualityScore` combines entity score with bonuses for reviewed content, canonical validity, internal links, schema, and word count compliance. Placeholders in content fields penalise score by 25 points.

## Metadata

- **Canonical URLs** — `generateCanonical` enforces lowercase absolute URLs with trailing slashes.
- **Titles/descriptions** — generated per page type in `generate-title.ts` / `generate-description.ts`.
- **Robots** — `generate-robots.ts` respects indexability per page.

## Schema

JSON-LD is rendered on live pages (Organization, LocalBusiness, Service, FAQ, Breadcrumb, Article). The `hasValidSchema` flag on page records reflects this.

## Internal links

`generateInternalLinks` produces contextual links per page type. Core pages link to services, locations, and contact.

## Sitemaps

Only indexable pages appear in sitemaps. Run `npm run sitemaps:generate` to produce `reports/sitemap-summary.json`.

## Phase-1 publishing

`src/data/publishing-overrides.ts` sets quality flags for Phase-1 paths: core routes, services, locations, Visakhapatnam service-location pages, and guides.

## Audits

| Script | Report |
|--------|--------|
| `npm run seo:audit` | Indexability failures with reasons |
| `npm run content:audit` | Word count and quality deficits |
| `npm run duplicates:audit` | Jaccard similarity outliers |
| `npm run links:audit` | Internal link coverage |
| `npm run schema:audit` | Schema flag validation |
| `npm run placeholder:audit` | `[PLACEHOLDER]` tokens in content |

See [SEO_AUDIT_GUIDE.md](./SEO_AUDIT_GUIDE.md) for workflow.
