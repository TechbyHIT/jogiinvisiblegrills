# Search Console Setup

## 1. Verify domain

Add property in [Google Search Console](https://search.google.com/search-console):

- **Domain property** (recommended): DNS TXT record
- **URL prefix**: HTML tag or file upload via Next.js

## 2. Submit sitemap

After deploy, submit:

```
https://www.jogiinvisiblegrills.in/sitemap.xml
```

(Must match `NEXT_PUBLIC_SITE_URL` — always **https** and **www**.)

Generate a local summary first:

```bash
npm run sitemaps:generate
```

Review `reports/sitemap-summary.json` for indexable URL counts by group.

## 3. Inspect Phase-1 URLs

Manually inspect:

- `/`
- `/services/invisible-grills/`
- `/locations/visakhapatnam/`
- `/visakhapatnam/invisible-grills/`
- `/guides/balcony-safety-checklist/`

Confirm "URL is on Google" or request indexing after quality gates pass.

## 4. Monitor coverage

Watch for:

- **Excluded by noindex** — expected for non-indexable registry pages
- **Crawled – currently not indexed** — investigate word count / quality
- **Duplicate without user-selected canonical** — check `generateCanonical`

## 5. Core Web Vitals

Use Search Console CWV report + Lighthouse in Chrome DevTools.

## 6. Ongoing cadence

| Frequency | Action |
|-----------|--------|
| Weekly | Check coverage and crawl errors |
| After content changes | Re-run `seo:audit`, redeploy, resubmit sitemap |
| Monthly | Review indexable page growth via `pages:count` |

See [SEO_AUDIT_GUIDE.md](./SEO_AUDIT_GUIDE.md) for audit script details.
