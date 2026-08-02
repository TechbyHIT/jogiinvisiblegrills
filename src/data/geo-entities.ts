/** Landmarks, IT parks and commercial clusters for contextual internal links (Karnataka). */

export type GeoEntity = {
  slug: string;
  name: string;
  citySlug: "bengaluru" | "mysuru";
  kind: "landmark" | "it-park" | "commercial";
  /** Legacy location slug for area/service path builders */
  legacyCitySlug: "bangalore" | "mysore";
  nearbyAreaSlugs: string[];
};

export const GEO_ENTITIES: GeoEntity[] = [
  {
    slug: "manyata-tech-park",
    name: "Manyata Tech Park",
    citySlug: "bengaluru",
    legacyCitySlug: "bangalore",
    kind: "it-park",
    nearbyAreaSlugs: ["nagawara", "thanisandra", "hebbal"],
  },
  {
    slug: "ecospace-itpl",
    name: "Ecospace & ITPL",
    citySlug: "bengaluru",
    legacyCitySlug: "bangalore",
    kind: "it-park",
    nearbyAreaSlugs: ["whitefield", "brookefield", "mahadevapura"],
  },
  {
    slug: "outer-ring-road",
    name: "Outer Ring Road (ORR)",
    citySlug: "bengaluru",
    legacyCitySlug: "bangalore",
    kind: "commercial",
    nearbyAreaSlugs: ["bellandur", "marathahalli", "sarjapur-road"],
  },
  {
    slug: "electronic-city-phase",
    name: "Electronic City",
    citySlug: "bengaluru",
    legacyCitySlug: "bangalore",
    kind: "it-park",
    nearbyAreaSlugs: ["electronic-city", "bommasandra", "hebbagodi"],
  },
  {
    slug: "koramangala-100ft",
    name: "Koramangala 100 Ft Road",
    citySlug: "bengaluru",
    legacyCitySlug: "bangalore",
    kind: "commercial",
    nearbyAreaSlugs: ["koramangala", "btm-layout", "hsr-layout"],
  },
  {
    slug: "mg-road-brigade",
    name: "MG Road & Brigade Road",
    citySlug: "bengaluru",
    legacyCitySlug: "bangalore",
    kind: "landmark",
    nearbyAreaSlugs: ["shivaji-nagar", "ulsoor", "domlur"],
  },
  {
    slug: "indiranagar-100ft",
    name: "Indiranagar 100 Ft Road",
    citySlug: "bengaluru",
    legacyCitySlug: "bangalore",
    kind: "commercial",
    nearbyAreaSlugs: ["indiranagar", "domlur", "jakkur"],
  },
  {
    slug: "whitefield-main",
    name: "Whitefield Main Road",
    citySlug: "bengaluru",
    legacyCitySlug: "bangalore",
    kind: "commercial",
    nearbyAreaSlugs: ["whitefield", "varthur", "kadugodi"],
  },
  {
    slug: "kempegowda-airport-corridor",
    name: "Airport Corridor (Devanahalli)",
    citySlug: "bengaluru",
    legacyCitySlug: "bangalore",
    kind: "landmark",
    nearbyAreaSlugs: ["devanahalli", "yelahanka", "thanisandra"],
  },
  {
    slug: "mysore-palace-area",
    name: "Mysuru Palace Area",
    citySlug: "mysuru",
    legacyCitySlug: "mysore",
    kind: "landmark",
    nearbyAreaSlugs: ["nazarbad", "vijayanagar", "kuvempunagar"],
  },
  {
    slug: "gokulam-mysuru",
    name: "Gokulam",
    citySlug: "mysuru",
    legacyCitySlug: "mysore",
    kind: "commercial",
    nearbyAreaSlugs: ["gokulam", "jayalakshmipuram", "siddhartha-layout"],
  },
];

export function getGeoEntitiesByCity(citySlug: "bengaluru" | "mysuru") {
  return GEO_ENTITIES.filter((e) => e.citySlug === citySlug);
}

export function getGeoEntitiesByKind(kind: GeoEntity["kind"]) {
  return GEO_ENTITIES.filter((e) => e.kind === kind);
}
