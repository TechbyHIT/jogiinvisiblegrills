import type { ProblemRecord } from "@/types";

export const PROBLEMS: ProblemRecord[] = [
  {
    id: "prob-child-balcony-safety",
    slug: "child-balcony-safety",
    name: "Child Balcony Safety",
    summary:
      "Protecting children from balcony fall risks in apartments and family homes with practical safety barriers.",
    detailedDescription:
      "Balconies are one of the most common fall-risk areas for toddlers and young children in apartments and duplex homes. Open railings, wide gaps and furniture placed near edges can create dangerous situations during everyday play. Child balcony safety solutions include invisible grills, balcony safety nets and children safety nets designed to reduce accidental falls while keeping the home usable. The right approach depends on railing design, floor height, mesh spacing requirements and whether view retention matters to the family.",
    relatedServiceIds: [
      "svc-balcony-safety-nets",
      "svc-children-safety-nets",
      "svc-invisible-grills",
      "svc-pet-safety-nets",
    ],
    customerQuestions: [
      "What is the safest option for a child on a high-floor balcony?",
      "Can safety nets be installed without damaging the railing?",
      "How close should mesh spacing be for toddlers?",
      "Do invisible grills work for child safety on balconies?",
    ],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 91,
  },
  {
    id: "prob-pet-fall-protection",
    slug: "pet-fall-protection",
    name: "Pet Fall Protection",
    summary:
      "Keeping cats and dogs safer near open balconies and windows in apartment living.",
    detailedDescription:
      "Pets, especially cats, can squeeze through balcony railing gaps or attempt to jump from open windows. Apartment residents often need finer mesh and sealed edges that account for pet behaviour rather than only human fall protection. Pet fall protection typically combines balcony safety nets or pet safety nets with careful edge finishing to close climb-through gaps. Assessment should include opening size, pet size and temperament, and whether the household also needs child safety coverage on the same openings.",
    relatedServiceIds: [
      "svc-pet-safety-nets",
      "svc-balcony-safety-nets",
      "svc-invisible-grills",
    ],
    customerQuestions: [
      "Which net is better for cats on apartment balconies?",
      "Can one installation protect both pets and children?",
      "Will pet safety nets block ventilation?",
      "How do you seal gaps pets might squeeze through?",
    ],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 89,
  },
  {
    id: "prob-mosquito-control",
    slug: "mosquito-control",
    name: "Mosquito Control",
    summary:
      "Window and door mosquito net solutions for better airflow without insect entry in humid coastal cities.",
    detailedDescription:
      "In humid Karnataka cities like Bengaluru, residents frequently keep windows open during evenings, making durable mesh and neat framing important for daily comfort. Mosquito net planning should match window type, usage frequency and whether the opening is also used for drying or utility access.",
    relatedServiceIds: ["svc-mosquito-nets", "svc-invisible-grills", "svc-balcony-safety-nets"],
    customerQuestions: [
      "Which mosquito net works best for sliding windows?",
      "Can mosquito nets be installed on balcony doors?",
      "How often should mesh be cleaned or replaced?",
      "Do mosquito nets affect visibility?",
    ],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 88,
  },
  {
    id: "prob-bird-roosting",
    slug: "bird-roosting",
    name: "Bird Roosting",
    summary:
      "Reducing pigeon and bird roosting on ledges, AC units and parapets to improve hygiene and maintenance.",
    detailedDescription:
      "Bird roosting creates recurring cleaning problems, noise and hygiene concerns near windows, AC outdoor units and parapet edges. Bird spike systems discourage landing on treated surfaces when installed with continuous coverage along the full landing line. Effective bird roosting control starts with identifying active roosting points rather than treating every surface blindly. Surface preparation, material choice and safe access planning matter for lasting results on both residential and commercial buildings.",
    relatedServiceIds: ["svc-bird-spikes", "svc-duct-area-nets", "svc-balcony-safety-nets"],
    customerQuestions: [
      "Do bird spikes harm birds?",
      "Where should bird spikes be installed on an apartment building?",
      "Can spikes be used on AC outdoor units?",
      "How long do bird spike installations last outdoors?",
    ],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 87,
  },
  {
    id: "prob-high-rise-fall-risk",
    slug: "high-rise-fall-risk",
    name: "High-Rise Fall Risk",
    summary:
      "Fall protection for high-floor balconies and windows where view retention and structural fixing both matter.",
    detailedDescription:
      "High-rise apartments introduce greater consequences for unsecured balcony and window openings. Families often want protection without heavy metal grills that block sea views or city skylines. Invisible grills and high-quality safety nets can address fall risk when anchored correctly and spaced for the intended safety purpose. High-rise projects require careful assessment of wall structure, railing type, wind exposure and building access for installation teams. Material grade choices become especially important in coastal high-rises where corrosion resistance supports long-term reliability.",
    relatedServiceIds: [
      "svc-invisible-grills",
      "svc-balcony-safety-nets",
      "svc-children-safety-nets",
      "svc-pet-safety-nets",
    ],
    customerQuestions: [
      "Are invisible grills strong enough for high-rise balconies?",
      "What fixing method is used on high floors?",
      "Is balcony netting suitable above certain heights?",
      "Which materials hold up best in coastal high-rises?",
    ],
    publicationStatus: "published",
    allowIndexing: true,
    contentReviewed: true,
    qualityScore: 90,
  },
];

export function getProblemBySlug(slug: string) {
  return PROBLEMS.find((problem) => problem.slug === slug);
}

export function getProblemById(id: string) {
  return PROBLEMS.find((problem) => problem.id === id);
}

export function getPublishedProblems() {
  return PROBLEMS.filter(
    (problem) => problem.publicationStatus === "published" && problem.allowIndexing,
  );
}
