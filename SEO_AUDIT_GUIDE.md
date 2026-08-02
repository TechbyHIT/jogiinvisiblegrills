# SEO Audit Guide

## Quick audit sequence

```bash
npm run pages:count        # baseline counts
npm run seo:audit          # indexability failures
npm run content:audit      # word count / quality
npm run duplicates:audit   # similarity outliers
npm run links:audit        # internal links
npm run schema:audit       # schema flags
npm run placeholder:audit  # placeholder tokens
npm run sitemaps:generate  # sitemap summary
```

All reports write to `reports/*.json`.

## Report reference

### seo-audit.json

Lists published pages failing `isPageIndexable` with boolean `reasons` per gate. Start here.

### content-audit.json

Pages below word count minimum or quality score 80. Fix by expanding `content-modules.ts`, entity data, or guides.

### duplicate-audit.json

Pages with Jaccard similarity above 0.7. Add unique local paragraphs; do not spin duplicate content.

### internal-link-audit.json

Pages with zero generated links or flag mismatches. Verify `generateInternalLinks` coverage.

### schema-audit.json

Pages missing title/description or invalid schema flag.

### placeholder-audit.json

Content containing `[TOKEN]` placeholders. Replace with real values in `.env.local`.

### sitemap-summary.json

Indexable URLs grouped by sitemap segment.

## Fixing common failures

| Failure | Fix |
|---------|-----|
| wordCount | Expand assembled content |
| qualityScore | Fix placeholders, improve content, verify flags |
| similarityScore | Add unique local/service paragraphs |
| localDataVerified | Review location facts before setting true |
| hasInternalLinks | Ensure page type handled in link generator |

## Publishing scripts

```bash
npm run pages:create -- --type=service-location --limit=1000
npm run pages:publish -- --batch-size=500
npm run pages:noindex -- --quality-below=80
```

## Admin UI

`/admin/audits/` and `/admin/publishing/` mirror audit data in the browser.

## Policy reminder

Never modify `isPageIndexable`. Expand content or adjust publishing overrides after verifying live pages meet standards.
