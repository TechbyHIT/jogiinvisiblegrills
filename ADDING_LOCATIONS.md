# Adding Locations

## 1. Define the location record

Add to `LOCATIONS` in `src/data/initial-locations.ts`:

```typescript
{
  id: "loc-new-city",
  slug: "new-city",
  name: "New City",
  locationType: "city",
  state: "Andhra Pradesh",
  isServed: true,
  publicationStatus: "published",
  allowIndexing: true,
  introduction: "...",
  localDescription: "...",
  localCharacteristics: [...],
  serviceDemandNotes: [...],
  verifiedLocalFacts: [...],
  localDataVerified: true,
  contentReviewed: true,
  qualityScore: 85,
}
```

## 2. Add content modules

Add location-specific modules to `content-modules.ts`:

- `local-intro-{slug}` — intro paragraph
- `LOCATION_MODULE_KEYS` entry with overview, coverage, and context modules

## 3. Auto-generated pages

The registry creates:

- `/locations/{slug}/` — location hub (700+ words via `assembleLocationPageContent`)
- `/{slug}/{service}/` — service-location pages for each published service

## 4. Enable only when served

Set `isServed: true` only for areas where installation visits are genuinely available.

## 5. Verify word count

```bash
npm run content:audit
```

Location pages must meet the **700-word** minimum before indexability.
