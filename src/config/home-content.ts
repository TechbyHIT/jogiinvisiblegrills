import { BUSINESS_CONFIG } from "@/config/business";
import { buildProgrammaticPath } from "@/lib/routing/parse-programmatic-slug";
import { servicePath } from "@/config/routes";

/** Services that use legacy /services/ routes instead of flat programmatic URLs. */
const LEGACY_SERVICE_SLUGS = new Set(["mosquito-nets"]);

export function homeServiceHref(
  serviceSlug: string,
  citySlug: "bengaluru" | "mysuru" = "bengaluru",
  intent?: string,
): string {
  if (LEGACY_SERVICE_SLUGS.has(serviceSlug)) {
    return servicePath(serviceSlug);
  }
  return buildProgrammaticPath(serviceSlug, citySlug, intent);
}

export const HOME_FAQS = [
  {
    question: "How do I get a quote for safety nets installation in Bengaluru or Mysuru?",
    answer:
      "Contact us for a free site inspection. We provide transparent, itemised quotations after understanding your opening sizes, materials and access — with no hidden charges.",
  },
  {
    question: "How long does safety net installation take?",
    answer:
      "Most residential installations are completed within 2–4 hours. Larger apartment or commercial projects may take 1–2 days. Fast-track slots are available when materials and access are ready.",
  },
  {
    question: "What warranty do you provide on safety nets and invisible grills?",
    answer:
      "Warranty coverage depends on material type — typically 2–5 years on nets and grills. Branded HDPE mesh and SS304/SS316 cable systems include after-sales support and maintenance guidance.",
  },
  {
    question: "How do I maintain safety nets?",
    answer:
      "Safety nets need minimal maintenance. Rinse with water every 3–6 months, avoid harsh chemicals, and schedule a post-monsoon tension check. We explain care steps at handover.",
  },
  {
    question: "Are your safety nets safe for children?",
    answer:
      "Yes. Child safety nets use tighter mesh and verified anchor points to prevent falls. Invisible grills are installed with spacing suited to toddlers and pets when requested.",
  },
  {
    question: "Do safety nets block sunlight or ventilation?",
    answer:
      "No. Mesh sizes are selected to allow adequate light and airflow while providing protection. Invisible grills offer even better transparency for panoramic views.",
  },
  {
    question: "Can safety nets be installed in rented apartments?",
    answer:
      "Yes. Our fixing methods are designed to be neat and society-friendly. Many systems can be removed without leaving marks when you move — confirm with your association if required.",
  },
  {
    question: "Do I need apartment association approval?",
    answer:
      "Most Bengaluru and Mysuru societies allow safety installations for child and balcony protection. We recommend checking with your association; documentation can be shared when needed.",
  },
  {
    question: "Which areas in Bengaluru and Mysuru do you serve?",
    answer:
      "We serve Bengaluru, Mysuru and listed localities across Karnataka. Share your pin code on WhatsApp and we confirm honest coverage before scheduling.",
  },
  {
    question: "What types of nets and materials do you use?",
    answer:
      "We use premium HDPE nylon nets, knotted safety mesh, SS304/SS316 invisible grill cables, mosquito frame systems and bird spike solutions — selected per opening type and exposure.",
  },
] as const;

export const BENGALURU_LOCALITY_LINE =
  "Whitefield, Koramangala, HSR Layout, Indiranagar, Electronic City, Jayanagar, Marathahalli, Bellandur, Hebbal, Yelahanka and 120+ Bengaluru localities";

export const MYSURU_LOCALITY_LINE =
  "Vijayanagar, Gokulam, Kuvempunagar, Saraswathipuram, Hebbal Layout, Siddhartha Layout and 30+ Mysuru localities";

export const SERVICE_AREA_LINE =
  "Bengaluru, Mysuru and listed Karnataka localities — free site inspection included";

export const HOME_QUICK_SERVICE_LINKS = [
  { label: "Invisible Grills in Bengaluru", href: buildProgrammaticPath("invisible-grills", "bengaluru") },
  { label: "Safety Nets in Bengaluru", href: buildProgrammaticPath("safety-nets", "bengaluru") },
  { label: "Balcony Nets in Bengaluru", href: buildProgrammaticPath("balcony-nets", "bengaluru") },
  { label: "Pigeon Nets in Bengaluru", href: buildProgrammaticPath("pigeon-nets", "bengaluru") },
  { label: "Bird Nets in Bengaluru", href: buildProgrammaticPath("bird-nets", "bengaluru") },
  { label: "Mosquito Nets", href: servicePath("mosquito-nets") },
  { label: "Sports Nets in Bengaluru", href: buildProgrammaticPath("sports-nets", "bengaluru") },
  { label: "Cloth Hangers in Bengaluru", href: buildProgrammaticPath("cloth-hangers", "bengaluru") },
  { label: "Bird Spikes in Bengaluru", href: buildProgrammaticPath("bird-spikes", "bengaluru") },
  { label: "Invisible Grills in Mysuru", href: buildProgrammaticPath("invisible-grills", "mysuru") },
  { label: "Safety Nets in Mysuru", href: buildProgrammaticPath("safety-nets", "mysuru") },
  { label: "Pigeon Nets in Mysuru", href: buildProgrammaticPath("pigeon-nets", "mysuru") },
] as const;

export const HOME_SERVICE_SHOWCASE = [
  {
    title: "Invisible Grills",
    description:
      "Modern stainless steel invisible grills that protect balconies and windows without blocking your view — SS304/SS316 cables for Bengaluru high-rises and Mysuru homes.",
    bullets: [
      "SS304 / SS316 marine-grade cables",
      "Nearly invisible from a distance",
      "Child-safe spacing options",
      "Rust-resistant fittings",
    ],
    serviceSlug: "invisible-grills",
    categorySlug: "invisible-grills",
    seed: 1,
  },
  {
    title: "Safety Nets",
    description:
      "Strong, certified safety nets for balconies, windows and terraces — child and pet fall protection with UV-stabilized mesh across Karnataka.",
    bullets: [
      "Child and pet fall protection",
      "High-strength knotted mesh",
      "Weather-resistant materials",
      "Custom-fit for any opening",
    ],
    serviceSlug: "safety-nets",
    categorySlug: "safety-nets",
    seed: 2,
  },
  {
    title: "Balcony Nets",
    description:
      "Transparent balcony protection nets that prevent falls and keep children, pets and objects secure on high-rise and villa balconies.",
    bullets: [
      "High-rise balcony protection",
      "Maintains light and ventilation",
      "Society-friendly fixing",
      "Post-monsoon tension checks",
    ],
    serviceSlug: "balcony-nets",
    categorySlug: "balcony-nets",
    seed: 3,
  },
  {
    title: "Pigeon Nets",
    description:
      "Keep balconies and utility areas clean and bird-free with premium anti-pigeon nets. UV-resistant, barely visible and built for apartments.",
    bullets: [
      "Effective pigeon exclusion",
      "UV-resistant HDPE mesh",
      "Ideal for balconies and ducts",
      "Humane long-lasting solution",
    ],
    serviceSlug: "pigeon-nets",
    categorySlug: "pigeon-nets",
    seed: 4,
  },
  {
    title: "Bird Nets",
    description:
      "Humane bird exclusion nets for balconies, windows, ducts and terraces — stop nesting and mess without harming birds.",
    bullets: [
      "Balcony and window bird proofing",
      "Duct and terrace coverage",
      "Barely visible mesh options",
      "Commercial and residential grade",
    ],
    serviceSlug: "bird-nets",
    categorySlug: "bird-nets",
    seed: 5,
  },
  {
    title: "Mosquito Nets",
    description:
      "Sliding and fixed mosquito frame systems for windows and doors — better ventilation with fine insect mesh for Bengaluru homes.",
    bullets: [
      "Sliding and openable frames",
      "Fine mesh insect protection",
      "Easy track cleaning",
      "Society-friendly installation",
    ],
    serviceSlug: "mosquito-nets",
    categorySlug: "mosquito-nets",
    seed: 6,
  },
  {
    title: "Sports Nets",
    description:
      "Professional sports net installation for cricket practice, volleyball, football and backyard training facilities.",
    bullets: [
      "Cricket practice and batting cages",
      "Volleyball and badminton courts",
      "School and academy installations",
      "Durable high-tension mesh",
    ],
    serviceSlug: "sports-nets",
    categorySlug: "sports-nets",
    seed: 7,
  },
  {
    title: "Cloth Hangers",
    description:
      "Space-saving ceiling and balcony cloth drying systems with smooth pulley operation for apartments with limited drying space.",
    bullets: [
      "Ceiling-mounted pulley systems",
      "Stainless steel rods and ropes",
      "Smooth rust-free operation",
      "Multiple line configurations",
    ],
    serviceSlug: "cloth-hangers",
    categorySlug: "cloth-hangers",
    seed: 8,
  },
  {
    title: "Bird Spikes",
    description:
      "Humane bird spike systems for ledges, parapets, AC units and commercial facades — stop perching without harming birds.",
    bullets: [
      "Ledges and parapet protection",
      "AC unit and duct ledges",
      "Non-invasive fixing options",
      "Low-maintenance deterrent",
    ],
    serviceSlug: "bird-spikes",
    categorySlug: "bird-spikes",
    seed: 9,
  },
] as const;

/** Primary service slugs used for homepage gallery rotation — one entry per service line. */
export const HOME_GALLERY_SERVICE_SLUGS = HOME_SERVICE_SHOWCASE.map((item) => item.serviceSlug);

export const HOME_NET_TYPES = [
  {
    name: "HDPE Nylon Nets",
    description: "High-density polyethylene nets with UV stabilizers for long outdoor life.",
    traits: ["UV resistant", "Weatherproof", "5+ year lifespan", "Ideal for balconies"],
  },
  {
    name: "Knotted Safety Mesh",
    description: "Strong knotted construction for child and pet safety applications.",
    traits: ["High impact resistance", "Flexible perimeter", "Child-safe", "Custom sizing"],
  },
  {
    name: "SS304 / SS316 Cables",
    description: "Marine-grade stainless steel for invisible grills and modern safety barriers.",
    traits: ["High tensile strength", "Corrosion resistant", "View preserving", "Low maintenance"],
  },
  {
    name: "Mosquito Frame Systems",
    description: "Sliding or fixed frames for windows and doors with fine insect mesh.",
    traits: ["Better ventilation", "Easy track cleaning", "Removable panels", "Society-friendly"],
  },
  {
    name: "Bird Spike Systems",
    description: "Humane deterrent systems for ledges, parapets and AC unit perches.",
    traits: ["Low maintenance", "Non-invasive fixing", "Long-lasting", "Commercial grade"],
  },
  {
    name: "Sports Practice Mesh",
    description: "Heavy-duty nets engineered for repeated ball impact in training facilities.",
    traits: ["High tension capacity", "Reinforced borders", "Academy grade", "Custom dimensions"],
  },
] as const;

export const HOME_TRUSTED_BRANDS = [
  "Garware",
  "Tuff Nets",
  "HDPE Certified Mesh",
  "SS304 / SS316 Cables",
  "ISI-Grade Hardware",
] as const;

export type HomeSeoGuideSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export const HOME_SEO_GUIDE = {
  title: "Safety Nets in Bengaluru & Mysuru – Your Complete Guide to Professional Installation",
  intro:
    `Welcome to ${BUSINESS_CONFIG.name}, a trusted provider of high-quality invisible grills, safety nets, pigeon nets and home protection systems across Bengaluru, Mysuru and Karnataka. Led by ${BUSINESS_CONFIG.ownerName}, our team focuses on measurement-led installations, premium materials and honest service coverage — so every family gets protection that lasts without compromising views, light or ventilation.`,
  sections: [
    {
      id: "why-essential",
      heading: "Why Safety Nets Are Essential for Bengaluru & Mysuru Residents",
      paragraphs: [
        "Rapid urban growth across Bengaluru and Mysuru has brought thousands of high-rise apartments, gated communities and villa layouts. With taller buildings come higher fall risks at balconies, utility windows and terrace edges — making safety nets and invisible grills essential for families with children, pets and elderly residents.",
        "Bird intrusion is another daily challenge in Karnataka cities. Pigeons nest on balconies and AC ledges, creating hygiene issues and property damage. Our pigeon nets and bird spike systems keep living spaces clean while maintaining airflow — a practical upgrade for apartment living.",
        "Bengaluru's monsoon and sun exposure influence material choice. We specify SS316 cables where corrosion risk is higher and UV-stabilized HDPE mesh for sun-exposed balconies.",
      ],
    },
    {
      id: "services-overview",
      heading: "Our Comprehensive Safety Net Services",
      paragraphs: [
        "We offer end-to-end solutions — from free site inspection and society-friendly fixing to post-installation maintenance guidance. Each opening is measured individually because standard sizes rarely fit Bengaluru apartment railings or Mysuru villa parapets.",
      ],
      bullets: [
        "Pigeon nets for balconies, terraces, ducts and utility areas",
        "Balcony safety nets for high-rise fall protection",
        "Child safety nets with tighter mesh and verified anchors",
        "Invisible grills for unobstructed views with SS304/SS316 cables",
        "Sports nets for cricket, volleyball and backyard practice",
        "Cloth drying hangers for space-saving apartment laundry",
        "Mosquito nets and bird spikes for complete home protection",
      ],
    },
    {
      id: "materials",
      heading: "Premium Materials We Use",
      paragraphs: [
        "Material quality determines how long your installation stays safe. We do not use one-size-fits-all templates — each project is specified based on opening use, exposure and budget.",
        "HDPE nylon nets with UV stabilizers suit most balcony and pigeon applications. Knotted safety mesh adds impact resistance for child-focused zones. Invisible grills use high-tension stainless cables with corrosion-aware fittings. Branded options from Garware and Tuff are available where customers request certified mesh grades.",
      ],
    },
    {
      id: "installation-process",
      heading: "Our Professional Installation Process",
      paragraphs: [
        "Every project follows a clear five-step process: enquiry and coverage confirmation, free site inspection, material selection, professional installation and after-sales support. Trained technicians protect floors during drilling, verify anchor strength and finish edges neatly — especially important in occupied apartments.",
        "We explain basic maintenance at handover: periodic rinsing, post-monsoon tension checks and when to schedule a revisit. Warranty scope is documented clearly so you know what is covered.",
      ],
    },
    {
      id: "localities",
      heading: "Areas We Serve in Bengaluru & Mysuru",
      paragraphs: [
        `Across Bengaluru we serve ${BENGALURU_LOCALITY_LINE.toLowerCase()} and surrounding suburbs. In Mysuru we cover ${MYSURU_LOCALITY_LINE.toLowerCase()} — share your exact location and we confirm availability honestly.`,
        "Whether you search for invisible grills near me, pigeon net installation, balcony safety nets or sports practice nets, our programmatic locality pages answer location-specific questions with measurement guidance and enquiry steps.",
      ],
    },
    {
      id: "get-started",
      heading: "Get Started with a Free Site Inspection",
      paragraphs: [
        `Ready to secure your home? Contact ${BUSINESS_CONFIG.name} today for a free, no-obligation site inspection. Call 8019718338 or WhatsApp 6309188085 — share photos and approximate measurements for a faster initial assessment.`,
        "We respond with transparent pricing factors — not generic rate cards that ignore your site conditions. Browse our services, city hubs and locality pages below, then reach out when you are ready to proceed.",
      ],
    },
  ] satisfies HomeSeoGuideSection[],
} as const;
