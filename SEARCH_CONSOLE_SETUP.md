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

### “Couldn’t fetch” on child sitemaps

Usually caused by **invalid SSL** (fixed on VPS) or **stale Search Console status** from before HTTPS worked.

On the server, every child must return **200** and `Content-Type: application/xml`:

```bash
curl -sI https://www.jogiinvisiblegrills.in/sitemaps/core.xml | head -5
curl -sI https://www.jogiinvisiblegrills.in/sitemaps/programmatic-1.xml | head -5
```

In Search Console → **Sitemaps**: remove `sitemap.xml`, wait a few minutes, submit again:

`https://www.jogiinvisiblegrills.in/sitemap.xml`

**Important:** the property must be **`https://www.jogiinvisiblegrills.in/`** (URL prefix). A domain-only property or non-www prefix can show “Couldn’t fetch” even when curl works.

Use **URL inspection** on a child sitemap, e.g. `https://www.jogiinvisiblegrills.in/sitemaps/core.xml` → **Test live URL** → should be crawlable.

Production builds run `npm run sitemaps:export` (via `build:standalone`) so nginx can serve `/sitemaps/*.xml` as static files.

Optional ping (after HTTPS is valid):

```bash
curl "https://www.google.com/ping?sitemap=https://www.jogiinvisiblegrills.in/sitemap.xml"
```

Discovered URL counts can take **24–72 hours** after successful fetches.

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
