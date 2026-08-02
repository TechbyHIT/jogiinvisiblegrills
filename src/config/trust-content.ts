/** Featherguard-style trust blocks — edit numbers only when verified. */
export const TRUST_STATS = [
  { value: "5000+", label: "Happy Customers" },
  { value: "10+", label: "Years Experience" },
  { value: "2–5 Yrs", label: "Warranty" },
  { value: "100%", label: "Satisfaction Focus" },
  { value: "2 Cities", label: "Wide Coverage" },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Call or WhatsApp Us",
    description:
      "Share your locality, floor level, property type and photos. We confirm honest service coverage before scheduling.",
  },
  {
    step: 2,
    title: "Free Site Inspection",
    description:
      "Our team visits for measurement, railing assessment and society guideline checks where applicable.",
  },
  {
    step: 3,
    title: "Material & Specification",
    description:
      "Choose SS304/SS316 invisible grills, HDPE balcony nets, mosquito systems or utility installations based on opening use.",
  },
  {
    step: 4,
    title: "Professional Installation",
    description:
      "Trained installers fix anchors, set cable spacing or mesh tension, finish edges neatly and protect your floors during work.",
  },
  {
    step: 5,
    title: "After-Sales Support",
    description:
      "We explain basic maintenance, post-monsoon checks and warranty scope so your installation stays safe long term.",
  },
] as const;

export const MATERIAL_TYPES = [
  {
    name: "SS304 / SS316 Cables",
    traits: ["High tensile strength", "Coastal humidity suited", "View-preserving"],
  },
  {
    name: "HDPE Nylon Nets",
    traits: ["UV resistant", "Balcony fall protection", "5+ year lifespan"],
  },
  {
    name: "Knotted Safety Mesh",
    traits: ["Child & pet safety", "Flexible perimeter", "Removable options"],
  },
  {
    name: "Mosquito Frame Systems",
    traits: ["Sliding or fixed", "Better ventilation", "Easy track cleaning"],
  },
  {
    name: "Bird Spike Systems",
    traits: ["Ledges & AC units", "Low maintenance", "Humane deterrent"],
  },
  {
    name: "Premium Brackets",
    traits: ["Secure anchoring", "Neat finishing", "Society-friendly"],
  },
] as const;

export const WHY_CHOOSE_ITEMS = [
  {
    title: "Experienced Technicians",
    description: "Measurement-led installations across apartments, villas and independent houses.",
  },
  {
    title: "Premium Materials",
    description: "SS304/SS316 cables, branded mesh and corrosion-aware specifications for local weather.",
  },
  {
    title: "Free Site Inspection",
    description: "No-obligation visit or photo-assisted assessment before a detailed quotation.",
  },
  {
    title: "Fast Installation",
    description: "Efficient mobilisation when access, society approvals and materials are ready.",
  },
  {
    title: "Safety Assured",
    description: "Correct spacing, anchor checks and tension verification on every project.",
  },
  {
    title: "Multi-City Coverage",
    description: "Bengaluru, Mysuru and listed Karnataka localities — confirmed honestly at enquiry.",
  },
] as const;

export const REQUIREMENT_CARDS = [
  {
    id: "invisible-grills",
    title: "Invisible Grills",
    description: "Modern grills that provide safety without blocking views or airflow.",
    serviceSlug: "invisible-grills",
  },
  {
    id: "safety-nets",
    title: "Safety Nets",
    description: "Certified fall-protection nets for balconies, windows and terraces.",
    serviceSlug: "safety-nets",
  },
  {
    id: "balcony-nets",
    title: "Balcony Nets",
    description: "Transparent balcony protection for high-rise apartments and villas.",
    serviceSlug: "balcony-nets",
  },
  {
    id: "pigeon-nets",
    title: "Pigeon Control",
    description: "Stop pigeons from invading your balconies and utility areas.",
    serviceSlug: "pigeon-nets",
  },
  {
    id: "bird-nets",
    title: "Bird Nets",
    description: "Humane bird exclusion for balconies, ducts and terrace edges.",
    serviceSlug: "bird-nets",
  },
  {
    id: "mosquito-nets",
    title: "Mosquito Nets",
    description: "Sliding and fixed frame systems for windows and doors.",
    serviceSlug: "mosquito-nets",
  },
  {
    id: "child-safety",
    title: "Child Safety",
    description: "Protect children from falls with certified nets and tighter spacing.",
    serviceSlug: "children-safety-nets",
  },
  {
    id: "sports-nets",
    title: "Sports Practice Nets",
    description: "Professional nets for cricket, volleyball and backyard training.",
    serviceSlug: "sports-nets",
  },
  {
    id: "cloth-hangers",
    title: "Cloth Drying Solutions",
    description: "Space-saving ceiling hangers for apartments and villas.",
    serviceSlug: "cloth-hangers",
  },
  {
    id: "bird-spikes",
    title: "Bird Spikes",
    description: "Humane deterrent systems for ledges, parapets and AC units.",
    serviceSlug: "bird-spikes",
  },
] as const;
