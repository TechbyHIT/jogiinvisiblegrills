import { buildProgrammaticPath } from "@/lib/routing/parse-programmatic-slug";
import { INDEXABLE_INTENTS, SEARCH_INTENTS } from "@/data/search-intents";
import {
  getProgrammaticLocations,
  getProgrammaticAreasByCity,
  PROGRAMMATIC_CITIES,
} from "@/data/programmatic-locations";
import {
  getProgrammaticServices,
  getProgrammaticServicesByCategory,
  PROGRAMMATIC_CATEGORIES,
} from "@/data/programmatic-services";
import type { ParsedProgrammaticSlug } from "@/lib/routing/parse-programmatic-slug";
import type { InternalLink } from "@/types";

export type SeoLinkHub = {
  id: string;
  title: string;
  description: string;
  links: InternalLink[];
};

function dedupe(links: InternalLink[]): InternalLink[] {
  const map = new Map<string, InternalLink>();
  for (const link of links) {
    map.set(link.href, link);
  }
  return [...map.values()];
}

/** Priority localities for ranking-focused internal links. */
const TOP_LOCALITY_SLUGS = [
  "bengaluru",
  "mysuru",
  "whitefield",
  "marathahalli",
  "electronic-city",
  "hsr-layout",
  "koramangala",
  "indiranagar",
  "bellandur",
  "jp-nagar",
  "jayanagar",
  "btm-layout",
  "hebbal",
  "yelahanka",
  "sarjapur-road",
  "bannerghatta-road",
  "mahadevapura",
  "rajajinagar",
  "banashankari",
  "domlur",
  "brookefield",
  "kr-puram",
  "thanisandra",
  "hennur",
  "varthur",
  "yeshwanthpur",
  "vijayanagar",
  "gokulam",
  "kuvempunagar",
  "jayalakshmipuram",
  "nazarbad",
  "bogadi",
  "siddhartha-layout",
];

export function generateProgrammaticLinkHubs(
  parsed: ParsedProgrammaticSlug,
): SeoLinkHub[] {
  const hubs: SeoLinkHub[] = [];
  const locations = getProgrammaticLocations();
  const services = getProgrammaticServices();
  const locBySlug = new Map(locations.map((l) => [l.slug, l]));
  const location = parsed.layer !== "service" ? parsed.location : undefined;

  // Hub 1: Full keyword intent links (price, near me, best, premium, etc.)
  if (location) {
    const keywordLinks = SEARCH_INTENTS.map((intent) => ({
      href: buildProgrammaticPath(parsed.service.slug, location.slug, intent.slug),
      label: `${parsed.service.name} ${intent.label} ${location.name}`,
    }));
    hubs.push({
      id: "top-keywords",
      title: `Top ${parsed.service.name} Searches in ${location.name}`,
      description:
        "Price, cost, near me, best, premium, installation, dealers, contractors, company, quotes, rates, hire, buy, repair and more — browse keyword pages for this locality.",
      links: keywordLinks,
    });

    // Extra hub: same intents on sibling city for crawl depth
    const altCity = location.kind === "area"
      ? (location.citySlug === "bengaluru" ? "mysuru" : "bengaluru")
      : location.slug === "bengaluru"
        ? "mysuru"
        : "bengaluru";
    const altCityName = altCity === "bengaluru" ? "Bengaluru" : "Mysuru";
    hubs.push({
      id: "city-keywords",
      title: `${parsed.service.name} Keyword Pages in ${altCityName}`,
      description: `Compare ${parsed.service.shortName} price, near me, best and premium searches in ${altCityName}.`,
      links: INDEXABLE_INTENTS.slice(0, 16).map((intent) => ({
        href: buildProgrammaticPath(parsed.service.slug, altCity, intent.slug),
        label: `${parsed.service.shortName} ${intent.label} ${altCityName}`,
      })),
    });
  } else {
    const rootKeywords = [
      ...INDEXABLE_INTENTS.map((intent) => ({
        href: buildProgrammaticPath(parsed.service.slug, "bengaluru", intent.slug),
        label: `${parsed.service.name} ${intent.label} Bengaluru`,
      })),
      ...INDEXABLE_INTENTS.slice(0, 12).map((intent) => ({
        href: buildProgrammaticPath(parsed.service.slug, "mysuru", intent.slug),
        label: `${parsed.service.name} ${intent.label} Mysuru`,
      })),
    ];
    hubs.push({
      id: "top-keywords",
      title: `Top ${parsed.service.name} Keyword Pages`,
      description: "High-intent searches across Bengaluru and Mysuru — price, near me, best, premium and more.",
      links: rootKeywords,
    });
  }

  // Hub 2: Same service across top localities
  const localityLinks: InternalLink[] = [];
  for (const slug of TOP_LOCALITY_SLUGS) {
    const loc = locBySlug.get(slug);
    if (!loc || location?.slug === slug) continue;
    localityLinks.push({
      href: buildProgrammaticPath(parsed.service.slug, slug),
      label: `${parsed.service.shortName} in ${loc.name}`,
    });
  }
  hubs.push({
    id: "top-localities",
    title: `${parsed.service.name} — Top Localities`,
    description: "Browse this service across high-demand Bengaluru and Mysuru neighbourhoods.",
    links: localityLinks,
  });

  // Hub 3: Same locality — more category services
  if (location) {
    const localServiceLinks: InternalLink[] = [];
    for (const cat of PROGRAMMATIC_CATEGORIES) {
      for (const svc of getProgrammaticServicesByCategory(cat.slug).slice(0, 5)) {
        if (svc.slug === parsed.service.slug) continue;
        localServiceLinks.push({
          href: buildProgrammaticPath(svc.slug, location.slug),
          label: `${svc.name} in ${location.name}`,
        });
      }
    }
    hubs.push({
      id: "local-services",
      title: `More Safety Services in ${location.name}`,
      description: "Cross-link related grills, nets, spikes and utility installations in the same locality.",
      links: dedupe(localServiceLinks).slice(0, 40),
    });

    // Intent × sibling services for denser internal linking
    const intentServiceLinks: InternalLink[] = [];
    const siblingServices = getProgrammaticServicesByCategory(parsed.service.categorySlug)
      .filter((s) => s.slug !== parsed.service.slug)
      .slice(0, 4);
    const priorityIntents = INDEXABLE_INTENTS.filter((i) =>
      ["price", "near-me", "best", "premium", "cost", "installation"].includes(i.slug),
    );
    for (const svc of siblingServices) {
      for (const intent of priorityIntents) {
        intentServiceLinks.push({
          href: buildProgrammaticPath(svc.slug, location.slug, intent.slug),
          label: `${svc.shortName} ${intent.label} ${location.name}`,
        });
      }
    }
    if (intentServiceLinks.length > 0) {
      hubs.push({
        id: "related-intent-pages",
        title: `Related ${location.name} Keyword Pages`,
        description: "Premium, near me, best, price and installation pages for related services in this locality.",
        links: intentServiceLinks.slice(0, 24),
      });
    }
  }

  // Hub 4: Category hub — sibling services
  const categoryLinks = getProgrammaticServicesByCategory(parsed.service.categorySlug)
    .filter((s) => s.slug !== parsed.service.slug)
    .map((s) => ({
      href: buildProgrammaticPath(s.slug),
      label: s.name,
    }));
  hubs.push({
    id: "category-siblings",
    title: `${PROGRAMMATIC_CATEGORIES.find((c) => c.slug === parsed.service.categorySlug)?.name ?? "Related"} Options`,
    description: "Explore variant service pages in the same product category.",
    links: categoryLinks,
  });

  // Hub 5: Cross-category top picks
  const crossLinks: InternalLink[] = [];
  for (const cat of PROGRAMMATIC_CATEGORIES) {
    if (cat.slug === parsed.service.categorySlug) continue;
    const top = getProgrammaticServicesByCategory(cat.slug)[0];
    if (!top) continue;
    crossLinks.push({
      href: location
        ? buildProgrammaticPath(top.slug, location.slug)
        : buildProgrammaticPath(top.slug),
      label: location
        ? `${top.shortName} in ${location.name}`
        : top.name,
    });
  }
  hubs.push({
    id: "cross-category",
    title: "Related Safety Categories",
    description: "Invisible grills, balcony nets, pigeon nets, sports nets, cloth hangers and bird spikes.",
    links: crossLinks,
  });

  // Hub 6: City hubs
  hubs.push({
    id: "city-hubs",
    title: "City Service Hubs",
    description: "Jump to Bengaluru or Mysuru city-level service coverage.",
    links: PROGRAMMATIC_CITIES.flatMap((city) =>
      services.slice(0, 6).map((svc) => ({
        href: buildProgrammaticPath(svc.slug, city.slug),
        label: `${svc.shortName} in ${city.name}`,
      })),
    ),
  });

  // Hub 7: Nearby areas
  if (location?.kind === "area") {
    const nearby = getProgrammaticAreasByCity(location.citySlug)
      .filter((a) => a.slug !== location.slug)
      .slice(0, 28);
    hubs.push({
      id: "nearby-areas",
      title: `Nearby ${location.citySlug === "bengaluru" ? "Bengaluru" : "Mysuru"} Localities`,
      description: "Compare the same service in neighbouring areas you may also serve.",
      links: nearby.map((a) => ({
        href: buildProgrammaticPath(parsed.service.slug, a.slug),
        label: `${parsed.service.shortName} in ${a.name}`,
      })),
    });
  }

  // Hub 8: Resources & conversion
  hubs.push({
    id: "resources",
    title: "Guides, Pricing & Contact",
    description: "Supporting pages for measurement, installation process and quotations.",
    links: [
      { href: "/pricing-guide/", label: "Pricing guide" },
      { href: "/installation-process/", label: "Installation process" },
      { href: "/materials-guide/", label: "Materials guide" },
      { href: "/safety-guide/", label: "Safety guide" },
      { href: "/faq/", label: "FAQ" },
      { href: "/gallery/", label: "Project gallery" },
      { href: "/testimonials/", label: "Testimonials" },
      { href: "/contact/", label: "Get free quote" },
      { href: "/services/", label: "All services" },
      { href: "/locations/", label: "All locations" },
    ],
  });

  return hubs.filter((h) => h.links.length > 0);
}

/** Flat list of all hub links for sidebar / schema. */
export function flattenProgrammaticLinkHubs(hubs: SeoLinkHub[]): InternalLink[] {
  return dedupe(hubs.flatMap((h) => h.links));
}
