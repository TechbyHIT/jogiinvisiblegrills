import { buildProgrammaticPath } from "@/lib/routing/parse-programmatic-slug";

/** Mega-menu service variant links (reference: 8 categories, ~98 variant labels). */
export type ServiceMenuVariant = {
  category: string;
  label: string;
  href: string;
  serviceSlug: string;
};

const bangalore = "bengaluru";

function svc(slug: string, label: string, category: string): ServiceMenuVariant {
  return {
    category,
    label,
    serviceSlug: slug,
    href: buildProgrammaticPath(slug),
  };
}

function citySvc(slug: string, label: string, category: string): ServiceMenuVariant {
  return {
    category,
    label,
    serviceSlug: slug,
    href: buildProgrammaticPath(slug, "bengaluru"),
  };
}

export const SERVICE_MENU_VARIANTS: ServiceMenuVariant[] = [
  // Invisible Grills
  svc("invisible-grills", "Invisible Grills", "Invisible Grills"),
  citySvc("invisible-grills", "Balcony Invisible Grills", "Invisible Grills"),
  citySvc("invisible-grills", "Window Invisible Grills", "Invisible Grills"),
  citySvc("invisible-grills", "Invisible Grills for Apartments", "Invisible Grills"),
  citySvc("invisible-grills", "Invisible Grills for Villas", "Invisible Grills"),
  citySvc("invisible-grills", "Invisible Grills for Child Safety", "Invisible Grills"),
  citySvc("invisible-grills", "Invisible Grills for Pets", "Invisible Grills"),
  // Pigeon / bird nets
  svc("balcony-safety-nets", "Pigeon Nets", "Pigeon Nets"),
  citySvc("balcony-safety-nets", "Anti Pigeon Nets", "Pigeon Nets"),
  citySvc("balcony-safety-nets", "Pigeon Safety Nets", "Pigeon Nets"),
  citySvc("balcony-safety-nets", "Balcony Pigeon Nets", "Pigeon Nets"),
  citySvc("balcony-safety-nets", "Window Pigeon Nets", "Pigeon Nets"),
  citySvc("duct-area-nets", "Duct Area Pigeon Nets", "Pigeon Nets"),
  // Safety Nets
  svc("balcony-safety-nets", "Safety Nets", "Safety Nets"),
  citySvc("balcony-safety-nets", "Balcony Safety Nets", "Safety Nets"),
  citySvc("children-safety-nets", "Kids Safety Nets", "Safety Nets"),
  citySvc("children-safety-nets", "Child Safety Nets", "Safety Nets"),
  citySvc("pet-safety-nets", "Pet Safety Nets", "Safety Nets"),
  citySvc("pet-safety-nets", "Cat Safety Nets", "Safety Nets"),
  citySvc("pet-safety-nets", "Dog Safety Nets", "Safety Nets"),
  // Sports Nets
  svc("cricket-practice-nets", "Sports Nets", "Sports Nets"),
  citySvc("cricket-practice-nets", "Cricket Nets", "Sports Nets"),
  citySvc("cricket-practice-nets", "Cricket Practice Nets", "Sports Nets"),
  citySvc("cricket-practice-nets", "Football Nets", "Sports Nets"),
  citySvc("cricket-practice-nets", "Football Goal Nets", "Sports Nets"),
  citySvc("cricket-practice-nets", "Volleyball Nets", "Sports Nets"),
  // Balcony Nets
  svc("balcony-safety-nets", "Balcony Nets", "Balcony Nets"),
  citySvc("balcony-safety-nets", "Balcony Protection Nets", "Balcony Nets"),
  citySvc("children-safety-nets", "Balcony Children Safety Nets", "Balcony Nets"),
  citySvc("pet-safety-nets", "Balcony Pet Safety Nets", "Balcony Nets"),
  citySvc("pet-safety-nets", "Balcony Cat Nets", "Balcony Nets"),
  citySvc("balcony-safety-nets", "Apartment Balcony Nets", "Balcony Nets"),
  citySvc("balcony-safety-nets", "High Rise Balcony Nets", "Balcony Nets"),
  // Cloth Hangers
  svc("cloth-hangers", "Cloth Hangers", "Cloth Hangers"),
  citySvc("cloth-hangers", "Ceiling Cloth Hangers", "Cloth Hangers"),
  citySvc("cloth-hangers", "Balcony Cloth Hangers", "Cloth Hangers"),
  citySvc("cloth-hangers", "Wall Mounted Cloth Hangers", "Cloth Hangers"),
  citySvc("cloth-hangers", "Pulley Cloth Hangers", "Cloth Hangers"),
  citySvc("cloth-hangers", "Stainless Steel Cloth Hangers", "Cloth Hangers"),
  citySvc("cloth-hangers", "Clothes Drying Hangers", "Cloth Hangers"),
  // Bird Nets
  svc("duct-area-nets", "Bird Nets", "Bird Nets"),
  citySvc("duct-area-nets", "Anti Bird Nets", "Bird Nets"),
  citySvc("duct-area-nets", "Bird Protection Nets", "Bird Nets"),
  citySvc("balcony-safety-nets", "Balcony Bird Nets", "Bird Nets"),
  citySvc("balcony-safety-nets", "Window Bird Nets", "Bird Nets"),
  citySvc("duct-area-nets", "Duct Area Bird Nets", "Bird Nets"),
  // Bird Spikes
  svc("bird-spikes", "Bird Spikes", "Bird Spikes"),
  citySvc("bird-spikes", "Pigeon Spikes", "Bird Spikes"),
  citySvc("bird-spikes", "Anti Bird Spikes", "Bird Spikes"),
  citySvc("bird-spikes", "Anti Pigeon Spikes", "Bird Spikes"),
  citySvc("bird-spikes", "Bird Control Spikes", "Bird Spikes"),
  citySvc("bird-spikes", "Pigeon Control Spikes", "Bird Spikes"),
  citySvc("bird-spikes", "Stainless Steel Bird Spikes", "Bird Spikes"),
];

export const SERVICE_MENU_CATEGORIES = [
  "Invisible Grills",
  "Pigeon Nets",
  "Safety Nets",
  "Sports Nets",
  "Balcony Nets",
  "Cloth Hangers",
  "Bird Nets",
  "Bird Spikes",
] as const;

export function getVariantsByCategory(category: string) {
  return SERVICE_MENU_VARIANTS.filter((v) => v.category === category);
}
