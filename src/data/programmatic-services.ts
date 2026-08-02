/** Flat-URL programmatic service catalog — 98 slugs across 8 categories. */
export type ProgrammaticServiceCategory = {
  slug: string;
  name: string;
};

export type ProgrammaticService = {
  slug: string;
  name: string;
  shortName: string;
  categorySlug: string;
  /** Parent service slug for shared content templates. */
  parentServiceSlug: string;
};

export const PROGRAMMATIC_CATEGORIES: ProgrammaticServiceCategory[] = [
  { slug: "invisible-grills", name: "Invisible Grills" },
  { slug: "safety-nets", name: "Safety Nets" },
  { slug: "balcony-nets", name: "Balcony Nets" },
  { slug: "bird-nets", name: "Bird Nets" },
  { slug: "pigeon-nets", name: "Pigeon Nets" },
  { slug: "sports-nets", name: "Sports Nets" },
  { slug: "cloth-hangers", name: "Cloth Hangers" },
  { slug: "bird-spikes", name: "Bird Spikes" },
];

type ServiceSeed = {
  slug: string;
  name: string;
  categorySlug: string;
  parentServiceSlug: string;
};

const SERVICE_SEEDS: ServiceSeed[] = [
  // Invisible Grills (12)
  { slug: "invisible-grills", name: "Invisible Grills", categorySlug: "invisible-grills", parentServiceSlug: "invisible-grills" },
  { slug: "balcony-invisible-grills", name: "Balcony Invisible Grills", categorySlug: "invisible-grills", parentServiceSlug: "invisible-grills" },
  { slug: "window-invisible-grills", name: "Window Invisible Grills", categorySlug: "invisible-grills", parentServiceSlug: "invisible-grills" },
  { slug: "invisible-grills-apartments", name: "Invisible Grills for Apartments", categorySlug: "invisible-grills", parentServiceSlug: "invisible-grills" },
  { slug: "invisible-grills-villas", name: "Invisible Grills for Villas", categorySlug: "invisible-grills", parentServiceSlug: "invisible-grills" },
  { slug: "invisible-grills-child-safety", name: "Invisible Grills for Child Safety", categorySlug: "invisible-grills", parentServiceSlug: "invisible-grills" },
  { slug: "invisible-grills-pets", name: "Invisible Grills for Pets", categorySlug: "invisible-grills", parentServiceSlug: "invisible-grills" },
  { slug: "stainless-steel-invisible-grills", name: "Stainless Steel Invisible Grills", categorySlug: "invisible-grills", parentServiceSlug: "invisible-grills" },
  { slug: "ss304-invisible-grills", name: "SS304 Invisible Grills", categorySlug: "invisible-grills", parentServiceSlug: "invisible-grills" },
  { slug: "ss316-invisible-grills", name: "SS316 Invisible Grills", categorySlug: "invisible-grills", parentServiceSlug: "invisible-grills" },
  { slug: "terrace-invisible-grills", name: "Terrace Invisible Grills", categorySlug: "invisible-grills", parentServiceSlug: "invisible-grills" },
  { slug: "staircase-invisible-grills", name: "Staircase Invisible Grills", categorySlug: "invisible-grills", parentServiceSlug: "invisible-grills" },
  // Pigeon Nets (12)
  { slug: "pigeon-nets", name: "Pigeon Nets", categorySlug: "pigeon-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "anti-pigeon-nets", name: "Anti Pigeon Nets", categorySlug: "pigeon-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "pigeon-safety-nets", name: "Pigeon Safety Nets", categorySlug: "pigeon-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "balcony-pigeon-nets", name: "Balcony Pigeon Nets", categorySlug: "pigeon-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "window-pigeon-nets", name: "Window Pigeon Nets", categorySlug: "pigeon-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "duct-area-pigeon-nets", name: "Duct Area Pigeon Nets", categorySlug: "pigeon-nets", parentServiceSlug: "duct-area-nets" },
  { slug: "terrace-pigeon-nets", name: "Terrace Pigeon Nets", categorySlug: "pigeon-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "building-pigeon-nets", name: "Building Pigeon Nets", categorySlug: "pigeon-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "apartment-pigeon-nets", name: "Apartment Pigeon Nets", categorySlug: "pigeon-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "pigeon-net-installation", name: "Pigeon Net Installation", categorySlug: "pigeon-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "hdpe-pigeon-nets", name: "HDPE Pigeon Nets", categorySlug: "pigeon-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "nylon-pigeon-nets", name: "Nylon Pigeon Nets", categorySlug: "pigeon-nets", parentServiceSlug: "balcony-safety-nets" },
  // Safety Nets (13)
  { slug: "safety-nets", name: "Safety Nets", categorySlug: "safety-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "building-safety-nets", name: "Building Safety Nets", categorySlug: "safety-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "kids-safety-nets", name: "Kids Safety Nets", categorySlug: "safety-nets", parentServiceSlug: "children-safety-nets" },
  { slug: "child-safety-nets", name: "Child Safety Nets", categorySlug: "safety-nets", parentServiceSlug: "children-safety-nets" },
  { slug: "pet-safety-nets", name: "Pet Safety Nets", categorySlug: "safety-nets", parentServiceSlug: "pet-safety-nets" },
  { slug: "cat-safety-nets", name: "Cat Safety Nets", categorySlug: "safety-nets", parentServiceSlug: "pet-safety-nets" },
  { slug: "dog-safety-nets", name: "Dog Safety Nets", categorySlug: "safety-nets", parentServiceSlug: "pet-safety-nets" },
  { slug: "fall-protection-nets", name: "Fall Protection Nets", categorySlug: "safety-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "industrial-safety-nets", name: "Industrial Safety Nets", categorySlug: "safety-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "construction-safety-nets", name: "Construction Safety Nets", categorySlug: "safety-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "staircase-safety-nets", name: "Staircase Safety Nets", categorySlug: "safety-nets", parentServiceSlug: "children-safety-nets" },
  { slug: "window-safety-nets", name: "Window Safety Nets", categorySlug: "safety-nets", parentServiceSlug: "children-safety-nets" },
  { slug: "high-rise-safety-nets", name: "High Rise Safety Nets", categorySlug: "safety-nets", parentServiceSlug: "balcony-safety-nets" },
  // Sports Nets (12)
  { slug: "sports-nets", name: "Sports Nets", categorySlug: "sports-nets", parentServiceSlug: "cricket-practice-nets" },
  { slug: "cricket-nets", name: "Cricket Nets", categorySlug: "sports-nets", parentServiceSlug: "cricket-practice-nets" },
  { slug: "cricket-practice-nets", name: "Cricket Practice Nets", categorySlug: "sports-nets", parentServiceSlug: "cricket-practice-nets" },
  { slug: "football-nets", name: "Football Nets", categorySlug: "sports-nets", parentServiceSlug: "cricket-practice-nets" },
  { slug: "football-goal-nets", name: "Football Goal Nets", categorySlug: "sports-nets", parentServiceSlug: "cricket-practice-nets" },
  { slug: "golf-nets", name: "Golf Nets", categorySlug: "sports-nets", parentServiceSlug: "cricket-practice-nets" },
  { slug: "volleyball-nets", name: "Volleyball Nets", categorySlug: "sports-nets", parentServiceSlug: "cricket-practice-nets" },
  { slug: "badminton-nets", name: "Badminton Nets", categorySlug: "sports-nets", parentServiceSlug: "cricket-practice-nets" },
  { slug: "tennis-nets", name: "Tennis Nets", categorySlug: "sports-nets", parentServiceSlug: "cricket-practice-nets" },
  { slug: "box-cricket-nets", name: "Box Cricket Nets", categorySlug: "sports-nets", parentServiceSlug: "cricket-practice-nets" },
  { slug: "rooftop-cricket-nets", name: "Rooftop Cricket Nets", categorySlug: "sports-nets", parentServiceSlug: "cricket-practice-nets" },
  { slug: "multi-sport-nets", name: "Multi Sport Nets", categorySlug: "sports-nets", parentServiceSlug: "cricket-practice-nets" },
  // Balcony Nets (12)
  { slug: "balcony-nets", name: "Balcony Nets", categorySlug: "balcony-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "balcony-safety-nets", name: "Balcony Safety Nets", categorySlug: "balcony-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "balcony-protection-nets", name: "Balcony Protection Nets", categorySlug: "balcony-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "balcony-children-safety-nets", name: "Balcony Children Safety Nets", categorySlug: "balcony-nets", parentServiceSlug: "children-safety-nets" },
  { slug: "balcony-pet-safety-nets", name: "Balcony Pet Safety Nets", categorySlug: "balcony-nets", parentServiceSlug: "pet-safety-nets" },
  { slug: "balcony-cat-nets", name: "Balcony Cat Nets", categorySlug: "balcony-nets", parentServiceSlug: "pet-safety-nets" },
  { slug: "apartment-balcony-nets", name: "Apartment Balcony Nets", categorySlug: "balcony-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "high-rise-balcony-nets", name: "High Rise Balcony Nets", categorySlug: "balcony-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "balcony-fall-protection-nets", name: "Balcony Fall Protection Nets", categorySlug: "balcony-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "balcony-mesh-nets", name: "Balcony Mesh Nets", categorySlug: "balcony-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "balcony-bird-nets", name: "Balcony Bird Nets", categorySlug: "balcony-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "balcony-invisible-grills-nets", name: "Balcony Invisible Grills", categorySlug: "balcony-nets", parentServiceSlug: "invisible-grills" },
  // Cloth Hangers (12)
  { slug: "cloth-hangers", name: "Cloth Hangers", categorySlug: "cloth-hangers", parentServiceSlug: "cloth-hangers" },
  { slug: "ceiling-cloth-hangers", name: "Ceiling Cloth Hangers", categorySlug: "cloth-hangers", parentServiceSlug: "cloth-hangers" },
  { slug: "balcony-cloth-hangers", name: "Balcony Cloth Hangers", categorySlug: "cloth-hangers", parentServiceSlug: "cloth-hangers" },
  { slug: "wall-mounted-cloth-hangers", name: "Wall Mounted Cloth Hangers", categorySlug: "cloth-hangers", parentServiceSlug: "cloth-hangers" },
  { slug: "pulley-cloth-hangers", name: "Pulley Cloth Hangers", categorySlug: "cloth-hangers", parentServiceSlug: "cloth-hangers" },
  { slug: "stainless-steel-cloth-hangers", name: "Stainless Steel Cloth Hangers", categorySlug: "cloth-hangers", parentServiceSlug: "cloth-hangers" },
  { slug: "clothes-drying-hangers", name: "Clothes Drying Hangers", categorySlug: "cloth-hangers", parentServiceSlug: "cloth-hangers" },
  { slug: "ceiling-drying-hangers", name: "Ceiling Drying Hangers", categorySlug: "cloth-hangers", parentServiceSlug: "cloth-hangers" },
  { slug: "utility-cloth-hangers", name: "Utility Cloth Hangers", categorySlug: "cloth-hangers", parentServiceSlug: "cloth-hangers" },
  { slug: "apartment-cloth-hangers", name: "Apartment Cloth Hangers", categorySlug: "cloth-hangers", parentServiceSlug: "cloth-hangers" },
  { slug: "retractable-cloth-hangers", name: "Retractable Cloth Hangers", categorySlug: "cloth-hangers", parentServiceSlug: "cloth-hangers" },
  { slug: "lift-cloth-hangers", name: "Lift Cloth Hangers", categorySlug: "cloth-hangers", parentServiceSlug: "cloth-hangers" },
  // Bird Nets (12)
  { slug: "bird-nets", name: "Bird Nets", categorySlug: "bird-nets", parentServiceSlug: "duct-area-nets" },
  { slug: "anti-bird-nets", name: "Anti Bird Nets", categorySlug: "bird-nets", parentServiceSlug: "duct-area-nets" },
  { slug: "bird-protection-nets", name: "Bird Protection Nets", categorySlug: "bird-nets", parentServiceSlug: "duct-area-nets" },
  { slug: "balcony-bird-nets", name: "Balcony Bird Nets", categorySlug: "bird-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "window-bird-nets", name: "Window Bird Nets", categorySlug: "bird-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "duct-area-bird-nets", name: "Duct Area Bird Nets", categorySlug: "bird-nets", parentServiceSlug: "duct-area-nets" },
  { slug: "terrace-bird-nets", name: "Terrace Bird Nets", categorySlug: "bird-nets", parentServiceSlug: "duct-area-nets" },
  { slug: "building-bird-nets", name: "Building Bird Nets", categorySlug: "bird-nets", parentServiceSlug: "duct-area-nets" },
  { slug: "pigeon-bird-nets", name: "Pigeon Bird Nets", categorySlug: "bird-nets", parentServiceSlug: "balcony-safety-nets" },
  { slug: "bird-net-installation", name: "Bird Net Installation", categorySlug: "bird-nets", parentServiceSlug: "duct-area-nets" },
  { slug: "garware-bird-nets", name: "Garware Bird Nets", categorySlug: "bird-nets", parentServiceSlug: "duct-area-nets" },
  { slug: "hdpe-bird-nets", name: "HDPE Bird Nets", categorySlug: "bird-nets", parentServiceSlug: "duct-area-nets" },
  // Bird Spikes (13)
  { slug: "bird-spikes", name: "Bird Spikes", categorySlug: "bird-spikes", parentServiceSlug: "bird-spikes" },
  { slug: "pigeon-spikes", name: "Pigeon Spikes", categorySlug: "bird-spikes", parentServiceSlug: "bird-spikes" },
  { slug: "anti-bird-spikes", name: "Anti Bird Spikes", categorySlug: "bird-spikes", parentServiceSlug: "bird-spikes" },
  { slug: "anti-pigeon-spikes", name: "Anti Pigeon Spikes", categorySlug: "bird-spikes", parentServiceSlug: "bird-spikes" },
  { slug: "bird-control-spikes", name: "Bird Control Spikes", categorySlug: "bird-spikes", parentServiceSlug: "bird-spikes" },
  { slug: "pigeon-control-spikes", name: "Pigeon Control Spikes", categorySlug: "bird-spikes", parentServiceSlug: "bird-spikes" },
  { slug: "stainless-steel-bird-spikes", name: "Stainless Steel Bird Spikes", categorySlug: "bird-spikes", parentServiceSlug: "bird-spikes" },
  { slug: "ac-unit-bird-spikes", name: "AC Unit Bird Spikes", categorySlug: "bird-spikes", parentServiceSlug: "bird-spikes" },
  { slug: "parapet-bird-spikes", name: "Parapet Bird Spikes", categorySlug: "bird-spikes", parentServiceSlug: "bird-spikes" },
  { slug: "ledge-bird-spikes", name: "Ledge Bird Spikes", categorySlug: "bird-spikes", parentServiceSlug: "bird-spikes" },
  { slug: "window-ledge-bird-spikes", name: "Window Ledge Bird Spikes", categorySlug: "bird-spikes", parentServiceSlug: "bird-spikes" },
  { slug: "commercial-bird-spikes", name: "Commercial Bird Spikes", categorySlug: "bird-spikes", parentServiceSlug: "bird-spikes" },
  { slug: "bird-spike-installation", name: "Bird Spike Installation", categorySlug: "bird-spikes", parentServiceSlug: "bird-spikes" },
];

export const PROGRAMMATIC_SERVICES: ProgrammaticService[] = SERVICE_SEEDS.map((seed) => ({
  ...seed,
  shortName: seed.name.length > 28 ? seed.name.split(" ").slice(0, 3).join(" ") : seed.name,
}));

export function getProgrammaticServices(): ProgrammaticService[] {
  return PROGRAMMATIC_SERVICES;
}

export function getProgrammaticServiceBySlug(slug: string): ProgrammaticService | undefined {
  return PROGRAMMATIC_SERVICES.find((s) => s.slug === slug);
}

export function getProgrammaticServicesByCategory(categorySlug: string): ProgrammaticService[] {
  return PROGRAMMATIC_SERVICES.filter((s) => s.categorySlug === categorySlug);
}
