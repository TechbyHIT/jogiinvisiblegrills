import type { PropertyTypeRecord } from "@/types";

export const PROPERTY_TYPES: PropertyTypeRecord[] = [
  {
    id: "pt-apartments",
    slug: "apartments",
    name: "Apartments",
    summary:
      "Apartment installations usually focus on balcony openings, window safety and compact utility spaces.",
    recommendations: [
      "Prioritise balcony fall protection for family floors",
      "Consider invisible grills where view retention matters",
      "Plan mosquito nets for frequently opened windows",
    ],
    suitableServiceIds: [
      "svc-invisible-grills",
      "svc-balcony-safety-nets",
      "svc-children-safety-nets",
      "svc-pet-safety-nets",
      "svc-mosquito-nets",
      "svc-cloth-hangers",
    ],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 90,
  },
  {
    id: "pt-independent-houses",
    slug: "independent-houses",
    name: "Independent Houses",
    summary:
      "Independent houses often need balcony, staircase void, window and outdoor ledge protection.",
    recommendations: [
      "Review balcony and stair openings together",
      "Add mosquito protection for ground and first-floor windows",
      "Consider bird spikes on exposed ledges where roosting is frequent",
    ],
    suitableServiceIds: [
      "svc-invisible-grills",
      "svc-balcony-safety-nets",
      "svc-children-safety-nets",
      "svc-mosquito-nets",
      "svc-bird-spikes",
      "svc-cricket-nets",
    ],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 88,
  },
  {
    id: "pt-villas",
    slug: "villas",
    name: "Villas",
    summary:
      "Villa projects may combine terrace edges, balcony openings and larger outdoor utility requirements.",
    recommendations: [
      "Plan terrace and balcony edges carefully",
      "Use durable outdoor materials",
      "Combine safety nets with mosquito protection where needed",
    ],
    suitableServiceIds: [
      "svc-invisible-grills",
      "svc-balcony-safety-nets",
      "svc-mosquito-nets",
      "svc-cricket-nets",
    ],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 86,
  },
  {
    id: "pt-commercial",
    slug: "commercial",
    name: "Commercial Buildings",
    summary:
      "Commercial sites may need duct nets, bird control and selected safety netting around service openings.",
    recommendations: [
      "Inspect duct and service openings first",
      "Use bird spikes on active roosting ledges",
      "Plan access for maintenance after installation",
    ],
    suitableServiceIds: ["svc-duct-area-nets", "svc-bird-spikes", "svc-balcony-safety-nets"],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 84,
  },
];

export function getPropertyTypeBySlug(slug: string) {
  return PROPERTY_TYPES.find((item) => item.slug === slug);
}

export function getPropertyTypeById(id: string) {
  return PROPERTY_TYPES.find((item) => item.id === id);
}

export function getPublishedPropertyTypes() {
  return PROPERTY_TYPES.filter(
    (item) => item.publicationStatus === "published" && item.allowIndexing,
  );
}
