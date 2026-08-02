import { areaPath, locationPath } from "@/config/routes";
import {
  getProgrammaticServicesByCategory,
  PROGRAMMATIC_CATEGORIES,
} from "@/data/programmatic-services";
import { buildProgrammaticPath } from "@/lib/routing/parse-programmatic-slug";
import { getPublishedAreas } from "@/data/initial-areas";
import { getPublishedLocations } from "@/data/initial-locations";

export type MegaMenuLink = {
  label: string;
  href: string;
};

export type MegaMenuSection = {
  title: string;
  links: MegaMenuLink[];
};

export type MegaMenuColumn = {
  sections: MegaMenuSection[];
};

export type MegaMenuConfig = {
  columns: MegaMenuColumn[];
  footerText: string;
  footerHref: string;
  footerLabel: string;
};

/** 8 categories in 4 columns × 2 sections (reference template layout). */
export function getServicesMegaMenu(): MegaMenuConfig {
  const columnPairs: [string, string][] = [
    ["Invisible Grills", "Pigeon Nets"],
    ["Safety Nets", "Sports Nets"],
    ["Balcony Nets", "Cloth Hangers"],
    ["Bird Nets", "Bird Spikes"],
  ];

  const columns: MegaMenuColumn[] = columnPairs.map(([top, bottom]) => ({
    sections: [
      {
        title: top,
        links: getProgrammaticServicesByCategory(
          PROGRAMMATIC_CATEGORIES.find((c) => c.name === top)?.slug ?? top.toLowerCase().replace(/\s+/g, "-"),
        ).slice(0, 7).map((v) => ({ label: v.name, href: buildProgrammaticPath(v.slug) })),
      },
      {
        title: bottom,
        links: getProgrammaticServicesByCategory(
          PROGRAMMATIC_CATEGORIES.find((c) => c.name === bottom)?.slug ?? bottom.toLowerCase().replace(/\s+/g, "-"),
        ).slice(0, 7).map((v) => ({ label: v.name, href: buildProgrammaticPath(v.slug) })),
      },
    ],
  }));

  return {
    columns,
    footerText: "Need help choosing the right solution?",
    footerHref: "/contact/",
    footerLabel: "Get free assessment →",
  };
}

export function getAreasMegaMenu(): MegaMenuConfig {
  const bangalore = getPublishedLocations().find((l) => l.slug === "bangalore");
  const mysore = getPublishedLocations().find((l) => l.slug === "mysore");

  const areaLinks = (locationSlug: string, locationId: string, limit = 8): MegaMenuLink[] =>
    getPublishedAreas()
      .filter((a) => a.locationId === locationId)
      .slice(0, limit)
      .map((area) => ({
        label: area.name,
        href: areaPath(locationSlug, area.slug),
      }));

  return {
    columns: [
      {
        sections: [
          {
            title: "Bengaluru",
            links: bangalore
              ? [
                  { label: "All Bengaluru Areas", href: locationPath(bangalore.slug) },
                  { label: "Invisible Grills in Bengaluru", href: buildProgrammaticPath("invisible-grills", "bengaluru") },
                  ...areaLinks(bangalore.slug, bangalore.id),
                ]
              : [],
          },
        ],
      },
      {
        sections: [
          {
            title: "Mysuru",
            links: mysore
              ? [
                  { label: "All Mysuru Areas", href: locationPath(mysore.slug) },
                  { label: "Safety Nets in Mysuru", href: buildProgrammaticPath("safety-nets", "mysuru") },
                  ...areaLinks(mysore.slug, mysore.id, 8),
                ]
              : [],
          },
        ],
      },
      {
        sections: [
          {
            title: "All Locations",
            links: [
              { label: "View all cities", href: "/locations/" },
              ...getPublishedLocations()
                .filter((l) => l.isServed)
                .map((l) => ({ label: l.name, href: locationPath(l.slug) })),
            ],
          },
        ],
      },
    ],
    footerText: "Don't see your locality?",
    footerHref: "/contact/",
    footerLabel: "Check coverage →",
  };
}

export { PROGRAMMATIC_CATEGORIES as SERVICE_MENU_CATEGORIES };
