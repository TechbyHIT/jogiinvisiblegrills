# Adding Services

## 1. Define the service record

Add an entry to `SERVICES` in `src/data/initial-services.ts`:

```typescript
{
  id: "svc-new-service",
  slug: "new-service",
  name: "New Service Name",
  shortName: "Short Name",
  categoryId: "cat-safety",
  publicationStatus: "published",
  allowIndexing: true,
  summary: "...",
  introduction: "...",
  detailedDescription: "...",
  customerProblems: [...],
  benefits: [...],
  // ... all required fields
  contentReviewed: true,
  qualityScore: 85,
}
```

## 2. Add content depth

Ensure assembled content reaches **1200+ words**. Shared modules in `content-modules.ts` (`SHARED_SERVICE_MODULE_KEYS`) are appended automatically.

## 3. Add imagery

Place WebP images under `public/images/services/` and reference in `heroImage` / `galleryImages`.

## 4. Registry auto-generation

`registry.ts` automatically creates:

- `/services/{slug}/` — service page
- `/{location}/{slug}/` — service-location pages for served cities
- `/{location}/{area}/{slug}/` — service-area pages for served localities

## 5. Verify

```bash
npm run pages:count
npm run content:audit
npm run test
```

## 6. Phase-1 override (optional)

Add path to `publishing-overrides.ts` if enabling explicit quality flags for launch.
