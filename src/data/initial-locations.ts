import type { LocationRecord } from "@/types";

const now = "2026-07-29T00:00:00.000Z";

export const LOCATIONS: LocationRecord[] = [
  {
    id: "loc-visakhapatnam",
    slug: "visakhapatnam",
    name: "Visakhapatnam",
    locationType: "city",
    state: "Andhra Pradesh",
    district: "Visakhapatnam",
    publicationStatus: "published",
    allowIndexing: true,
    isServed: true,
    introduction:
      "Visakhapatnam has a dense mix of apartments, gated communities and independent homes where balcony and window safety installations are frequently requested.",
    localDescription:
      "We provide invisible grills, balcony safety nets and related home-safety installations across served localities in Visakhapatnam. Coastal weather and high-rise living make durable materials and careful fixing especially important.",
    nearbyLocationIds: ["loc-anakapalle", "loc-gajuwaka"],
    landmarkIds: ["lm-rk-beach", "lm-maddilapalem"],
    propertyTypes: ["apartments", "independent-houses", "villas", "commercial"],
    localCharacteristics: [
      "High-rise apartment clusters",
      "Coastal humidity exposure",
      "Mixed independent-house localities",
      "Balcony-oriented residential layouts",
    ],
    serviceDemandNotes: [
      "Strong demand for balcony fall protection in apartments",
      "Interest in view-preserving invisible grills",
      "Mosquito net requests in humid seasons",
    ],
    verifiedLocalFacts: [
      "Visakhapatnam includes coastal and inland residential zones",
      "Apartment living is common in several rapidly developed localities",
      "Outdoor installations benefit from corrosion-conscious material choices",
    ],
    localDataVerified: true,
    contentReviewed: true,
    qualityScore: 92,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "loc-gajuwaka",
    slug: "gajuwaka",
    name: "Gajuwaka",
    locationType: "town",
    state: "Andhra Pradesh",
    district: "Visakhapatnam",
    publicationStatus: "published",
    allowIndexing: true,
    isServed: true,
    introduction:
      "Gajuwaka has residential pockets with apartments and independent houses that often need balcony nets, invisible grills and utility installations.",
    localDescription:
      "Service visits in Gajuwaka focus on practical safety setups for family homes and apartment balconies, with attention to site access and opening measurements.",
    nearbyLocationIds: ["loc-visakhapatnam", "loc-anakapalle"],
    landmarkIds: [],
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: [
      "Mixed residential density",
      "Apartment and independent-house demand",
    ],
    serviceDemandNotes: [
      "Balcony safety nets for family apartments",
      "Invisible grill requests for newer homes",
    ],
    verifiedLocalFacts: [
      "Gajuwaka is a served residential market near Visakhapatnam",
    ],
    localDataVerified: true,
    contentReviewed: true,
    qualityScore: 86,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "loc-anakapalle",
    slug: "anakapalle",
    name: "Anakapalle",
    locationType: "town",
    state: "Andhra Pradesh",
    district: "Anakapalle",
    publicationStatus: "published",
    allowIndexing: true,
    isServed: true,
    introduction:
      "Anakapalle residents commonly request home safety and protection installations for independent houses and growing apartment projects.",
    localDescription:
      "We serve genuine installation requests in Anakapalle with honest service-area coverage and measurement-based quotations.",
    nearbyLocationIds: ["loc-visakhapatnam", "loc-gajuwaka"],
    landmarkIds: [],
    propertyTypes: ["independent-houses", "apartments"],
    localCharacteristics: ["Independent-house concentration", "Growing residential demand"],
    serviceDemandNotes: ["Safety nets for family homes", "Mosquito net and utility requests"],
    verifiedLocalFacts: ["Anakapalle is included in our served towns around Visakhapatnam"],
    localDataVerified: true,
    contentReviewed: true,
    qualityScore: 84,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "loc-vizianagaram",
    slug: "vizianagaram",
    name: "Vizianagaram",
    locationType: "city",
    state: "Andhra Pradesh",
    district: "Vizianagaram",
    publicationStatus: "published",
    allowIndexing: true,
    isServed: true,
    introduction:
      "Vizianagaram homeowners request balcony nets, invisible grills and mosquito protection for apartments and independent houses.",
    localDescription:
      "Installations in Vizianagaram are scheduled based on site readiness and measurement requirements. We do not claim a branch office in every locality.",
    nearbyLocationIds: ["loc-visakhapatnam"],
    landmarkIds: [],
    propertyTypes: ["apartments", "independent-houses"],
    localCharacteristics: ["Residential apartment demand", "Independent-house safety needs"],
    serviceDemandNotes: ["Child and balcony safety requests", "Window protection interest"],
    verifiedLocalFacts: ["Vizianagaram is a served city within our Andhra Pradesh coverage"],
    localDataVerified: true,
    contentReviewed: true,
    qualityScore: 85,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "loc-bangalore",
    slug: "bangalore",
    name: "Bangalore",
    locationType: "city",
    state: "Karnataka",
    district: "Bengaluru Urban",
    publicationStatus: "published",
    allowIndexing: true,
    isServed: true,
    introduction:
      "Bangalore (Bengaluru) has dense IT-corridor apartment communities, established residential layouts and gated societies where balcony fall protection, invisible grills and mosquito nets are frequently requested.",
    localDescription:
      "We provide invisible grills, balcony safety nets, children and pet nets, mosquito nets, bird spikes and related installations across served Bangalore localities. High-rise living, society approval processes and inland climate shape material and access planning differently from coastal markets.",
    nearbyLocationIds: ["loc-mysore"],
    landmarkIds: [],
    propertyTypes: ["apartments", "independent-houses", "villas", "commercial"],
    localCharacteristics: [
      "High-rise and mid-rise apartment corridors",
      "IT-park adjacent residential demand",
      "Strict society modification guidelines in many complexes",
      "Inland climate without coastal salt exposure",
    ],
    serviceDemandNotes: [
      "Strong demand for view-preserving invisible grills in premium apartments",
      "Balcony and children safety nets in family societies",
      "Mosquito net and bird spike requests across established layouts",
      "Cloth hanger and utility installations on service balconies",
    ],
    verifiedLocalFacts: [
      "Bangalore is a major inland metro in Karnataka with dense apartment living",
      "Whitefield, HSR, Koramangala, Electronic City and Indiranagar are among served localities",
      "Society permissions and lift access often affect installation scheduling",
    ],
    localDataVerified: true,
    contentReviewed: true,
    qualityScore: 92,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "loc-mysore",
    slug: "mysore",
    name: "Mysore",
    locationType: "city",
    state: "Karnataka",
    district: "Mysuru",
    publicationStatus: "published",
    allowIndexing: true,
    isServed: true,
    introduction:
      "Mysore (Mysuru) homeowners request balcony nets, invisible grills and mosquito protection for apartments, independent houses and villa-style residences across served localities.",
    localDescription:
      "Installations in Mysore are planned around lower- to mid-rise housing stock, independent-house openings and growing apartment projects. We confirm visit availability honestly and base quotations on measurements rather than city-wide flat rates.",
    nearbyLocationIds: ["loc-bangalore"],
    landmarkIds: [],
    propertyTypes: ["apartments", "independent-houses", "villas"],
    localCharacteristics: [
      "Mix of independent houses and mid-rise apartments",
      "Villa and layout-style residential pockets",
      "Lower high-rise density than Bangalore IT corridors",
    ],
    serviceDemandNotes: [
      "Balcony and window safety for family homes",
      "Invisible grill interest in newer apartments",
      "Mosquito net demand in bedroom and utility openings",
    ],
    verifiedLocalFacts: [
      "Mysore is a served Karnataka city within our installation coverage",
      "Residential demand concentrates in established layouts and growing apartment pockets",
    ],
    localDataVerified: true,
    contentReviewed: true,
    qualityScore: 88,
    createdAt: now,
    updatedAt: now,
  },
];

export function getLocationBySlug(slug: string) {
  return LOCATIONS.find((location) => location.slug === slug);
}

export function getLocationById(id: string) {
  return LOCATIONS.find((location) => location.id === id);
}

export function getPublishedLocations() {
  return LOCATIONS.filter(
    (location) =>
      location.publicationStatus === "published" &&
      location.allowIndexing &&
      location.isServed &&
      location.state !== "Andhra Pradesh",
  );
}
