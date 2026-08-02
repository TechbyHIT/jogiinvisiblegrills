import type { AreaRecord } from "@/types";

const now = "2026-07-29T00:00:00.000Z";

export type AreaSeed = {
  id: string;
  slug: string;
  name: string;
  locationId: "loc-bangalore" | "loc-mysore" | "loc-visakhapatnam";
  introduction: string;
  localDescription: string;
  propertyTypes: AreaRecord["propertyTypes"];
  localCharacteristics: string[];
  verifiedLocalFacts: string[];
  nearbyAreaIds: string[];
  qualityScore?: number;
};

/** Build a published, indexable area record from a seed. */
export function buildAreaFromSeed(seed: AreaSeed): AreaRecord {
  return {
    id: seed.id,
    slug: seed.slug,
    name: seed.name,
    locationId: seed.locationId,
    publicationStatus: "published",
    allowIndexing: true,
    isServed: true,
    introduction: seed.introduction,
    localDescription: seed.localDescription,
    propertyTypes: seed.propertyTypes,
    localCharacteristics: seed.localCharacteristics,
    nearbyAreaIds: seed.nearbyAreaIds,
    landmarkIds: [],
    verifiedLocalFacts: seed.verifiedLocalFacts,
    localDataVerified: true,
    contentReviewed: true,
    qualityScore: seed.qualityScore ?? 85,
    createdAt: now,
    updatedAt: now,
  };
}

type CompactAreaInput = {
  slug: string;
  name: string;
  locationId: AreaSeed["locationId"];
  propertyTypes?: AreaRecord["propertyTypes"];
  nearbyAreaIds: string[];
  traits?: string;
};

const LOCATION_LABEL: Record<AreaSeed["locationId"], string> = {
  "loc-bangalore": "Bangalore",
  "loc-mysore": "Mysore",
  "loc-visakhapatnam": "Visakhapatnam",
};

/** Generate unique locality copy from compact inputs — scales to thousands of areas. */
export function compactAreaSeed(input: CompactAreaInput): AreaSeed {
  const city = LOCATION_LABEL[input.locationId];
  const traits = input.traits ?? "mixed residential apartments and independent houses";
  const propertyTypes = input.propertyTypes ?? ["apartments", "independent-houses"];

  return {
    id: `area-${input.slug}`,
    slug: input.slug,
    name: input.name,
    locationId: input.locationId,
    introduction: `${input.name} residents in ${city} frequently request invisible grills, balcony safety nets, mosquito protection and children safety installations for ${traits}.`,
    localDescription: `Installations in ${input.name} are planned with measurement-led quotations, society-aware scheduling and materials suited to local building types in ${city}.`,
    propertyTypes,
    localCharacteristics: [
      `${city} ${input.name} residential demand`,
      "Balcony and window safety interest",
      "Family-oriented safety upgrades",
    ],
    verifiedLocalFacts: [`${input.name} is a served ${city} locality listed in our service coverage`],
    nearbyAreaIds: input.nearbyAreaIds,
  };
}

export function buildAreasFromCompact(inputs: CompactAreaInput[]): AreaRecord[] {
  return inputs.map((input) => buildAreaFromSeed(compactAreaSeed(input)));
}
