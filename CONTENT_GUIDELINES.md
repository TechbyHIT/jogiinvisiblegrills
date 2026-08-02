# Content Guidelines

## Voice and locale

- Write in **Indian English** — clear, practical, honest.
- Address homeowners in Andhra Pradesh (Visakhapatnam, Gajuwaka, Anakapalle, Vizianagaram).
- Avoid Americanisms unless industry-standard (e.g. "apartment" not "condo").

## What to avoid

- **Keyword stuffing** or spun filler paragraphs.
- **Fake claims** — no invented awards, branch counts, or decades of experience.
- **Placeholder tokens** like `[PHONE_NUMBER]` in published content (penalises quality score).
- **Doorway pages** — locality pages without verified local facts and sufficient word count.

## Content sources

| Layer | Location |
|-------|----------|
| Reusable modules | `src/data/content-modules.ts` |
| Entity-specific | `initial-services.ts`, `initial-locations.ts`, etc. |
| Assembly | `src/lib/content/assemble-page-content.ts` |
| Guides/blog | `src/data/guides.ts`, `src/data/blog-posts.ts` |

## Word count compliance

Content must meet minimums in `src/config/seo.ts`. Expand:

1. Useful local context (verified facts only).
2. Practical installation and maintenance advice.
3. Honest pricing factor explanations.

Do **not** lower word count thresholds or modify `isPageIndexable`.

## Local data verification

Set `localDataVerified: true` only when:

- Locality is genuinely served.
- Facts are accurate (not generic city copy).
- A human has reviewed the page.

## Review checklist

- [ ] Word count meets page type minimum
- [ ] No placeholder tokens
- [ ] Unique intro for locality/service combination
- [ ] Internal links render on live page
- [ ] Schema matches page type
- [ ] `npm run content:audit` passes for the path
