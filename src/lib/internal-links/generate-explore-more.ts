import {
  areaPath,
  blogPath,
  guidePath,
  locationPath,
  propertyTypeServicePath,
  servicePath,
} from "@/config/routes";
import { getWhatsAppUrl, BUSINESS_CONFIG } from "@/config/business";
import { getPublishedAreas, getAreaById } from "@/data/initial-areas";
import { getPublishedLocations } from "@/data/initial-locations";
import { getPublishedBlogPosts } from "@/data/blog-posts";
import { getGeoEntitiesByKind, type GeoEntity } from "@/data/geo-entities";
import { getPublishedGuides } from "@/data/guides";
import { getPublishedPropertyTypes } from "@/data/property-types";
import { getPublishedServices } from "@/data/initial-services";
import { INDEXABLE_INTENTS } from "@/data/search-intents";
import {
  getProgrammaticAreasByCity,
  PROGRAMMATIC_CITIES,
} from "@/data/programmatic-locations";
import {
  getProgrammaticServicesByCategory,
  PROGRAMMATIC_CATEGORIES,
} from "@/data/programmatic-services";
import type { SeoLinkHub } from "@/lib/internal-links/seo-link-hubs";
import type { ExploreMoreCard, ExploreMoreLink } from "@/lib/internal-links/explore-more-types";
import {
  buildProgrammaticPath,
  type ParsedProgrammaticSlug,
} from "@/lib/routing/parse-programmatic-slug";
import type { PageRecord } from "@/types";

const LINKS_MIN = 8;
const LINKS_MAX = 12;

export function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rotate<T>(arr: T[], seed: number): T[] {
  if (arr.length <= 1) return arr;
  const offset = seed % arr.length;
  return [...arr.slice(offset), ...arr.slice(0, offset)];
}

function sliceLinks(links: ExploreMoreLink[], seed: number): ExploreMoreLink[] {
  const unique = dedupeLinks(links);
  const rotated = rotate(unique, seed);
  const count = LINKS_MIN + (seed % (LINKS_MAX - LINKS_MIN + 1));
  return rotated.slice(0, Math.min(count, rotated.length));
}

function dedupeLinks(links: ExploreMoreLink[]): ExploreMoreLink[] {
  const map = new Map<string, ExploreMoreLink>();
  for (const link of links) {
    if (!map.has(link.href)) map.set(link.href, link);
  }
  return [...map.values()];
}

function consumeLinks(
  links: ExploreMoreLink[],
  used: Set<string>,
  seed: number,
): ExploreMoreLink[] {
  const fresh = links.filter((l) => !used.has(l.href));
  const picked = sliceLinks(fresh, seed);
  for (const link of picked) used.add(link.href);
  return picked;
}

function shuffleCards(cards: ExploreMoreCard[], seed: number): ExploreMoreCard[] {
  const pinned = cards.filter((c) => c.variant === "cta" || c.variant === "highlight");
  const rest = cards.filter((c) => c.variant !== "cta" && c.variant !== "highlight");
  return [...rotate(rest, seed), ...pinned];
}

function hubLinks(hubs: SeoLinkHub[], id: string): ExploreMoreLink[] {
  const hub = hubs.find((h) => h.id === id);
  if (!hub) return [];
  return hub.links.map((l) => ({ href: l.href, label: l.label }));
}

function entityCitySlug(parsed: ParsedProgrammaticSlug): "bengaluru" | "mysuru" | undefined {
  if (parsed.layer === "service") return undefined;
  if (parsed.location.kind === "city") {
    return parsed.location.slug as "bengaluru" | "mysuru";
  }
  return parsed.location.citySlug;
}

function legacyLocationSlug(city: "bengaluru" | "mysuru") {
  return city === "bengaluru" ? "bangalore" : "mysore";
}

function geoEntityLinks(
  entities: GeoEntity[],
  serviceSlug: string,
  serviceShortName: string,
  seed: number,
  used: Set<string>,
): ExploreMoreLink[] {
  const links = entities.flatMap((entity) => {
    const area = entity.nearbyAreaSlugs[0];
    if (!area) return [];
    return {
      href: buildProgrammaticPath(serviceSlug, area),
      label: `${serviceShortName} near ${entity.name}`,
    };
  });
  return consumeLinks(links, used, seed);
}

/** Programmatic service/location pages — unique card set per URL. */
export function generateExploreMoreFromProgrammatic(
  parsed: ParsedProgrammaticSlug,
  hubs: SeoLinkHub[],
  pagePath: string,
): ExploreMoreCard[] {
  const seed = hashSeed(pagePath);
  const used = new Set<string>();
  const cards: ExploreMoreCard[] = [];
  const service = parsed.service;
  const citySlug = entityCitySlug(parsed);
  const legacyCity = citySlug ? legacyLocationSlug(citySlug) : undefined;
  const locationName =
    parsed.layer !== "service" ? parsed.location.name : "Bengaluru & Mysuru";

  const currentHref = pagePath.endsWith("/") ? pagePath : `${pagePath}/`;

  cards.push({
    id: "current-service",
    title: "Current page",
    description: `You are viewing ${service.name} coverage for ${locationName}.`,
    icon: "service",
    variant: "highlight",
    links: consumeLinks(
      [
        {
          href: buildProgrammaticPath(service.slug),
          label: `${service.name} overview`,
          isCurrent: parsed.layer === "service",
        },
        ...(parsed.layer !== "service"
          ? [
              {
                href: buildProgrammaticPath(service.slug, parsed.location.slug),
                label: `${service.shortName} in ${parsed.location.name}`,
                isCurrent: parsed.layer === "service-location",
              },
            ]
          : []),
        ...(parsed.layer === "service-location-intent"
          ? [
              {
                href: currentHref,
                label: `${service.shortName} ${parsed.intent.label} in ${parsed.location.name}`,
                isCurrent: true,
              },
            ]
          : []),
        ...PROGRAMMATIC_CITIES.map((c) => ({
          href: buildProgrammaticPath(service.slug, c.slug),
          label: `${service.shortName} in ${c.name}`,
        })),
      ],
      used,
      seed + 1,
    ),
    viewAllHref: buildProgrammaticPath(service.slug),
    viewAllLabel: "Service hub",
  });

  const related = consumeLinks(
    [
      ...hubLinks(hubs, "category-siblings"),
      ...hubLinks(hubs, "local-services").slice(0, 16),
      ...hubLinks(hubs, "cross-category"),
    ],
    used,
    seed + 2,
  );
  if (related.length > 0) {
    cards.push({
      id: "related-services",
      title: "Related services",
      description: "Sibling products and cross-category safety installations.",
      icon: "related",
      links: related,
      viewAllHref: "/services/",
      viewAllLabel: "All services",
    });
  }

  const nearbyAreas = consumeLinks(hubLinks(hubs, "nearby-areas"), used, seed + 3);
  if (nearbyAreas.length > 0) {
    cards.push({
      id: "nearby-areas",
      title: "Nearby areas",
      description: "Neighbouring localities with the same service coverage.",
      icon: "map-pin",
      links: nearbyAreas,
      viewAllHref: legacyCity ? locationPath(legacyCity) : "/locations/",
      viewAllLabel: "All localities",
    });
  } else {
    const topLocal = consumeLinks(hubLinks(hubs, "top-localities"), used, seed + 3);
    if (topLocal.length > 0) {
      cards.push({
        id: "nearby-areas",
        title: "Popular areas",
        description: "High-demand neighbourhoods for this installation.",
        icon: "map-pin",
        links: topLocal,
        viewAllHref: "/locations/",
        viewAllLabel: "All locations",
      });
    }
  }

  const cityLinks = consumeLinks(
    PROGRAMMATIC_CITIES.flatMap((city) =>
      getProgrammaticServicesByCategory(service.categorySlug)
        .slice(0, 3)
        .map((s) => ({
          href: buildProgrammaticPath(s.slug, city.slug),
          label: `${s.shortName} in ${city.name}`,
        })),
    ),
    used,
    seed + 4,
  );
  if (cityLinks.length > 0) {
    cards.push({
      id: "nearby-cities",
      title: "Nearby cities",
      description: "City-level hubs across our Karnataka service area.",
      icon: "city",
      links: cityLinks,
      viewAllHref: "/locations/",
      viewAllLabel: "City directory",
    });
  }

  cards.push({
    id: "nearby-districts",
    title: "Districts & regions",
    description: "Bengaluru Urban, Mysuru district and surrounding corridors.",
    icon: "district",
    links: consumeLinks(
      [
        { href: locationPath("bangalore"), label: "Bengaluru Urban installations" },
        { href: locationPath("mysore"), label: "Mysuru district coverage" },
        { href: buildProgrammaticPath(service.slug, "bengaluru"), label: `${service.shortName} — Bengaluru` },
        { href: buildProgrammaticPath(service.slug, "mysuru"), label: `${service.shortName} — Mysuru` },
        { href: "/locations/", label: "Full location index" },
      ],
      used,
      seed + 5,
    ),
  });

  cards.push({
    id: "nearby-states",
    title: "Service state",
    description: "We focus on Karnataka — Bengaluru and Mysuru corridors.",
    icon: "state",
    links: consumeLinks(
      [
        { href: "/locations/", label: "Karnataka service map" },
        { href: buildProgrammaticPath(service.slug, "bengaluru"), label: "Bengaluru metro" },
        { href: buildProgrammaticPath(service.slug, "mysuru"), label: "Mysuru city" },
        { href: "/about/", label: `About ${BUSINESS_CONFIG.name}` },
      ],
      used,
      seed + 6,
    ),
  });

  const popular = consumeLinks(
    hubLinks(hubs, "top-keywords").length > 0
      ? hubLinks(hubs, "top-keywords")
      : hubLinks(hubs, "related-intent-pages"),
    used,
    seed + 7,
  );
  if (popular.length > 0) {
    cards.push({
      id: "popular-searches",
      title: "Popular searches",
      description: "High-intent keyword pages — price, near me, best and more.",
      icon: "search",
      links: popular,
    });
  }

  const priceIntents = INDEXABLE_INTENTS.filter((i) =>
    ["price", "cost", "charges", "rates", "quotes"].includes(i.slug),
  );
  if (parsed.layer !== "service") {
    const priceLinks = consumeLinks(
      priceIntents.map((intent) => ({
        href: buildProgrammaticPath(service.slug, parsed.location.slug, intent.slug),
        label: `${service.shortName} ${intent.label} in ${parsed.location.name}`,
      })),
      used,
      seed + 8,
    );
    cards.push({
      id: "price-guides",
      title: "Price & quotes",
      description: "Transparent pricing searches and quotation paths.",
      icon: "price",
      links: [
        ...priceLinks,
        ...consumeLinks([{ href: "/pricing-guide/", label: "Pricing guide" }], used, seed + 81),
      ].slice(0, LINKS_MAX),
      viewAllHref: "/pricing-guide/",
      viewAllLabel: "Pricing guide",
    });
  } else {
    cards.push({
      id: "price-guides",
      title: "Price guides",
      description: "How we quote measurements and materials.",
      icon: "price",
      links: consumeLinks(
        [
          { href: "/pricing-guide/", label: "Pricing guide" },
          ...priceIntents.slice(0, 6).flatMap((intent) =>
            PROGRAMMATIC_CITIES.map((c) => ({
              href: buildProgrammaticPath(service.slug, c.slug, intent.slug),
              label: `${service.shortName} ${intent.label} ${c.name}`,
            })),
          ),
        ],
        used,
        seed + 8,
      ),
      viewAllHref: "/pricing-guide/",
      viewAllLabel: "Pricing guide",
    });
  }

  cards.push({
    id: "buying-guides",
    title: "Buying guides",
    description: "Compare options before you install.",
    icon: "guide",
    links: consumeLinks(
      [
        ...getPublishedGuides().map((g) => ({
          href: guidePath(g.slug),
          label: g.title,
        })),
        { href: "/safety-guide/", label: "Safety guide" },
        { href: "/materials-guide/", label: "Materials guide" },
      ],
      used,
      seed + 9,
    ),
    viewAllHref: "/guides/",
    viewAllLabel: "All guides",
  });

  cards.push({
    id: "installation-guides",
    title: "Installation",
    description: "Process, maintenance and repair paths.",
    icon: "install",
    links: consumeLinks(
      [
        { href: "/installation-process/", label: "Installation process" },
        ...(parsed.layer !== "service"
          ? INDEXABLE_INTENTS.filter((i) =>
              ["installation", "maintenance", "repair"].includes(i.slug),
            ).map((intent) => ({
              href: buildProgrammaticPath(service.slug, parsed.location.slug, intent.slug),
              label: `${service.shortName} ${intent.label}`,
            }))
          : []),
      ],
      used,
      seed + 10,
    ),
    viewAllHref: "/installation-process/",
    viewAllLabel: "Installation process",
  });

  const parentPublished = getPublishedServices().find((s) => s.slug === service.parentServiceSlug);
  const applicationLabels = parentPublished?.applications?.length
    ? parentPublished.applications
    : ["Balconies", "Windows", "Terraces", "Staircases", "Duct areas"];
  cards.push({
    id: "applications",
    title: "Applications",
    description: "Where this service is commonly installed.",
    icon: "applications",
    links: consumeLinks(
      applicationLabels.slice(0, 10).map((label, i) => ({
        href: buildProgrammaticPath(
          getProgrammaticServicesByCategory(service.categorySlug)[i % 3]?.slug ?? service.slug,
          citySlug ?? "bengaluru",
        ),
        label: `${service.shortName} for ${label}`,
      })),
      used,
      seed + 11,
    ),
  });

  cards.push({
    id: "building-types",
    title: "Building types",
    description: "Apartments, villas, offices and more.",
    icon: "building",
    links: consumeLinks(
      getPublishedPropertyTypes().flatMap((pt) => {
        const svc = getPublishedServices().find((s) => pt.suitableServiceIds.includes(s.id));
        if (!svc) return [];
        return {
          href: propertyTypeServicePath(pt.slug, svc.slug),
          label: `${svc.shortName} for ${pt.name}`,
        };
      }),
      used,
      seed + 12,
    ),
    viewAllHref: "/property-types/",
    viewAllLabel: "Property types",
  });

  cards.push({
    id: "materials",
    title: "Materials",
    description: "Grades, mesh types and hardware we specify.",
    icon: "materials",
    links: consumeLinks(
      [
        { href: "/materials-guide/", label: "Materials guide" },
        ...getProgrammaticServicesByCategory(service.categorySlug)
          .filter((s) => /ss304|ss316|hdpe|nylon|stainless/i.test(s.name))
          .slice(0, 8)
          .map((s) => ({
            href: buildProgrammaticPath(s.slug),
            label: s.name,
          })),
      ],
      used,
      seed + 13,
    ),
    viewAllHref: "/materials-guide/",
    viewAllLabel: "Materials guide",
  });

  if (parsed.layer !== "service") {
    for (const block of [
      { id: "maintenance", icon: "maintenance" as const, title: "Maintenance", slug: "maintenance" },
      { id: "repair", icon: "repair" as const, title: "Repair", slug: "repair" },
    ]) {
      const intent = INDEXABLE_INTENTS.find((i) => i.slug === block.slug);
      if (!intent) continue;
      const links = consumeLinks(
        [
          {
            href: buildProgrammaticPath(service.slug, parsed.location.slug, intent.slug),
            label: `${service.shortName} ${intent.label} in ${parsed.location.name}`,
          },
        ],
        used,
        seed + 14,
      );
      if (links.length > 0) {
        cards.push({
          id: block.id,
          title: block.title,
          description: `${block.title} and after-care for ${locationName}.`,
          icon: block.icon,
          links,
        });
      }
    }
  }

  cards.push({
    id: "faqs",
    title: "FAQs",
    description: "Quick answers before you book a site visit.",
    icon: "faq",
    links: consumeLinks(
      [
        { href: "/faq/", label: "Frequently asked questions" },
        { href: `${currentHref}#faq`, label: "FAQs on this page" },
        { href: "/safety-guide/", label: "Safety FAQ topics" },
        { href: "/pricing-guide/", label: "Pricing FAQ" },
      ],
      used,
      seed + 15,
    ),
    viewAllHref: "/faq/",
    viewAllLabel: "All FAQs",
  });

  cards.push({
    id: "recent-projects",
    title: "Recent projects",
    description: "Photos from completed installations.",
    icon: "projects",
    links: consumeLinks(
      [
        { href: "/gallery/", label: "Project gallery" },
        { href: "/projects/", label: "Featured projects" },
        { href: "/testimonials/", label: "Customer stories" },
      ],
      used,
      seed + 16,
    ),
    viewAllHref: "/gallery/",
    viewAllLabel: "View gallery",
  });

  cards.push({
    id: "gallery",
    title: "Gallery",
    description: "Browse real installation photography.",
    icon: "gallery",
    links: consumeLinks(
      [
        { href: "/gallery/", label: "Full gallery" },
        ...PROGRAMMATIC_CATEGORIES.slice(0, 6).map((cat) => ({
          href: `/gallery/?category=${cat.slug}`,
          label: `${cat.name} photos`,
        })),
      ],
      used,
      seed + 17,
    ),
    viewAllHref: "/gallery/",
    viewAllLabel: "Gallery",
  });

  cards.push({
    id: "latest-blogs",
    title: "Latest articles",
    description: "Guides and comparisons from our blog.",
    icon: "blog",
    links: consumeLinks(
      getPublishedBlogPosts().map((post) => ({
        href: blogPath(post.slug),
        label: post.title,
      })),
      used,
      seed + 18,
    ),
    viewAllHref: "/blog/",
    viewAllLabel: "All articles",
  });

  if (citySlug) {
    const landmarks = geoEntityLinks(
      rotate(getGeoEntitiesByKind("landmark").filter((e) => e.citySlug === citySlug), seed),
      service.slug,
      service.shortName,
      seed + 19,
      used,
    );
    if (landmarks.length > 0) {
      cards.push({
        id: "nearby-landmarks",
        title: "Nearby landmarks",
        description: "Corridors and landmarks we serve around you.",
        icon: "landmark",
        links: landmarks,
      });
    }

    const itLinks = geoEntityLinks(
      rotate(getGeoEntitiesByKind("it-park").filter((e) => e.citySlug === citySlug), seed + 1),
      service.slug,
      service.shortName,
      seed + 20,
      used,
    );
    if (itLinks.length > 0) {
      cards.push({
        id: "nearby-it-parks",
        title: "Nearby IT parks",
        description: "Tech park and campus-adjacent installations.",
        icon: "it-park",
        links: itLinks,
      });
    }

    const commercial = geoEntityLinks(
      rotate(getGeoEntitiesByKind("commercial").filter((e) => e.citySlug === citySlug), seed + 2),
      service.slug,
      service.shortName,
      seed + 21,
      used,
    );
    if (commercial.length > 0) {
      cards.push({
        id: "nearby-commercial",
        title: "Commercial areas",
        description: "High-street and business district coverage.",
        icon: "commercial",
        links: commercial,
      });
    }

    const apartmentAreas = getProgrammaticAreasByCity(citySlug)
      .filter((a) =>
        ["whitefield", "bellandur", "hsr-layout", "koramangala", "marathahalli"].includes(a.slug),
      )
      .map((a) => ({
        href: buildProgrammaticPath(service.slug, a.slug),
        label: `${service.shortName} in ${a.name} apartments`,
      }));
    cards.push({
      id: "nearby-apartments",
      title: "Apartment corridors",
      description: "Dense residential layouts and societies.",
      icon: "apartment",
      links: consumeLinks(
        [
          {
            href: propertyTypeServicePath("apartments", service.parentServiceSlug),
            label: "Apartments hub",
          },
          ...apartmentAreas,
        ],
        used,
        seed + 22,
      ),
      viewAllHref: propertyTypeServicePath("apartments", service.parentServiceSlug),
      viewAllLabel: "Apartments",
    });
  }

  const cross = consumeLinks(hubLinks(hubs, "cross-category"), used, seed + 23);
  if (cross.length > 0) {
    cards.push({
      id: "related-products",
      title: "Related products",
      description: "Complementary nets, grills and accessories.",
      icon: "products",
      links: cross,
    });
  }

  cards.push({
    id: "customer-reviews",
    title: "Customer reviews",
    description: "Social proof from Bengaluru and Mysuru clients.",
    icon: "reviews",
    links: consumeLinks(
      [
        { href: "/testimonials/", label: "Testimonials" },
        { href: getWhatsAppUrl(), label: "WhatsApp reviews channel" },
      ],
      used,
      seed + 24,
    ),
    viewAllHref: "/testimonials/",
    viewAllLabel: "All reviews",
  });

  cards.push({
    id: "contact",
    title: "Contact",
    description: "Speak with our installation team.",
    icon: "contact",
    variant: "accent",
    links: consumeLinks(
      [
        { href: "/contact/", label: "Contact form" },
        { href: getWhatsAppUrl(), label: "WhatsApp chat" },
        { href: "/services/", label: "Service directory" },
      ],
      used,
      seed + 25,
    ),
    viewAllHref: "/contact/",
    viewAllLabel: "Contact us",
  });

  cards.push({
    id: "book-inspection",
    title: "Book free inspection",
    description: "Measurement-led quote with no obligation.",
    icon: "inspection",
    variant: "cta",
    links: consumeLinks(
      [
        { href: "/contact/", label: "Book free site inspection" },
        {
          href: getWhatsAppUrl("Hi, I would like to book a free site inspection."),
          label: "WhatsApp booking",
        },
        { href: "/installation-process/", label: "What to expect on visit" },
      ],
      used,
      seed + 26,
    ),
    viewAllHref: "/contact/",
    viewAllLabel: "Book now",
  });

  return shuffleCards(cards.filter((c) => c.links.length > 0), seed);
}

/** Legacy hub pages (locations, guides, blog, etc.). */
export function generateExploreMoreFromPage(page: PageRecord): ExploreMoreCard[] {
  const seed = hashSeed(page.path);
  const used = new Set<string>();
  const cards: ExploreMoreCard[] = [];

  const push = (card: Omit<ExploreMoreCard, "links"> & { linkSource: ExploreMoreLink[] }) => {
    const links = consumeLinks(card.linkSource, used, seed + cards.length);
    if (links.length === 0) return;
    cards.push({ ...card, links });
  };

  push({
    id: "related-services",
    title: "Services",
    description: "Explore installation categories.",
    icon: "related",
    linkSource: getPublishedServices().map((s) => ({
      href: servicePath(s.slug),
      label: s.name,
    })),
    viewAllHref: "/services/",
    viewAllLabel: "All services",
  });

  push({
    id: "nearby-cities",
    title: "Cities",
    description: "Bengaluru and Mysuru hubs.",
    icon: "city",
    linkSource: getPublishedLocations().map((l) => ({
      href: locationPath(l.slug),
      label: l.name,
    })),
    viewAllHref: "/locations/",
    viewAllLabel: "Locations",
  });

  if (page.locationId) {
    const location = getPublishedLocations().find((l) => l.id === page.locationId);
    if (location) {
      push({
        id: "nearby-areas",
        title: "Areas",
        description: `Localities in ${location.name}.`,
        icon: "map-pin",
        linkSource: getPublishedAreas()
          .filter((a) => a.locationId === location.id)
          .map((a) => ({
            href: areaPath(location.slug, a.slug),
            label: a.name,
          })),
        viewAllHref: locationPath(location.slug),
        viewAllLabel: "City hub",
      });
    }
  }

  if (page.areaId && page.locationId) {
    const location = getPublishedLocations().find((l) => l.id === page.locationId);
    const area = getPublishedAreas().find((a) => a.id === page.areaId);
    if (location && area) {
      push({
        id: "nearby-areas",
        title: "Nearby areas",
        description: "Neighbouring localities.",
        icon: "map-pin",
        linkSource: area.nearbyAreaIds
          .map((id) => getAreaById(id))
          .filter(Boolean)
          .map((near) => ({
            href: areaPath(location.slug, near!.slug),
            label: near!.name,
          })),
      });
    }
  }

  push({
    id: "buying-guides",
    title: "Guides",
    description: "Buying and safety resources.",
    icon: "guide",
    linkSource: getPublishedGuides().map((g) => ({
      href: guidePath(g.slug),
      label: g.title,
    })),
    viewAllHref: "/guides/",
    viewAllLabel: "Guides",
  });

  push({
    id: "price-guides",
    title: "Pricing",
    description: "Quotes and rate guidance.",
    icon: "price",
    linkSource: [{ href: "/pricing-guide/", label: "Pricing guide" }],
    viewAllHref: "/pricing-guide/",
    viewAllLabel: "Pricing",
  });

  push({
    id: "latest-blogs",
    title: "Blog",
    description: "Latest articles.",
    icon: "blog",
    linkSource: getPublishedBlogPosts().map((p) => ({
      href: blogPath(p.slug),
      label: p.title,
    })),
    viewAllHref: "/blog/",
    viewAllLabel: "Blog",
  });

  push({
    id: "book-inspection",
    title: "Book free inspection",
    description: "Schedule a site visit.",
    icon: "inspection",
    variant: "cta",
    linkSource: [
      { href: "/contact/", label: "Book inspection" },
      { href: getWhatsAppUrl(), label: "WhatsApp" },
    ],
    viewAllHref: "/contact/",
    viewAllLabel: "Book",
  });

  return shuffleCards(cards, seed);
}
