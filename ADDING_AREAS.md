# Adding Areas

Areas are localities within a served city (e.g. Madhurawada within Visakhapatnam).

## 1. Define the area record

Add to `AREAS` in `src/data/initial-areas.ts`:

```typescript
{
  id: "area-new-locality",
  slug: "new-locality",
  name: "New Locality",
  locationId: "loc-visakhapatnam",
  isServed: true,
  publicationStatus: "published",
  allowIndexing: true,
  introduction: "...",
  localDescription: "...",
  localCharacteristics: [...],
  verifiedLocalFacts: [...],
  localDataVerified: true,
  contentReviewed: true,
  qualityScore: 85,
}
```

## 2. Generated routes

- `/locations/{city}/{area}/` — area hub page
- `/{city}/{area}/{service}/` — service-area pages

## 3. Content requirements

Service-area pages require **900+ words**. Expand `assembleAreaServicePageContent` inputs or add area-specific modules if needed.

## 4. Indexability caution

Area and service-area pages are **medium crawl priority**. Do not publish until:

- Unique local facts are verified
- Word count and similarity gates pass
- Content is reviewed

Many area combinations can exist in the registry but remain non-indexable until quality thresholds are met — this is intentional.
