import type { PageType } from "@/types";

export type SitemapGroup = {
  id: string;
  label: string;
  pageTypes: PageType[];
  changefreq: "daily" | "weekly" | "monthly";
  priority: number;
};

export const SITEMAP_GROUPS: SitemapGroup[] = [
  {
    id: "core",
    label: "Core Pages",
    pageTypes: ["core"],
    changefreq: "weekly",
    priority: 1,
  },
  {
    id: "services",
    label: "Services",
    pageTypes: ["service"],
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    id: "locations",
    label: "Locations",
    pageTypes: ["location", "area"],
    changefreq: "weekly",
    priority: 0.8,
  },
  {
    id: "local-services",
    label: "Local Service Pages",
    pageTypes: ["service-location", "service-area"],
    changefreq: "weekly",
    priority: 0.7,
  },
  {
    id: "solutions",
    label: "Solutions",
    pageTypes: ["solution", "property-type-service"],
    changefreq: "monthly",
    priority: 0.6,
  },
  {
    id: "guides",
    label: "Guides",
    pageTypes: ["guide"],
    changefreq: "monthly",
    priority: 0.5,
  },
  {
    id: "blog",
    label: "Blog",
    pageTypes: ["blog"],
    changefreq: "monthly",
    priority: 0.4,
  },
];

export function getSitemapGroupForPageType(pageType: PageType): SitemapGroup {
  return (
    SITEMAP_GROUPS.find((group) => group.pageTypes.includes(pageType)) ??
    SITEMAP_GROUPS[0]
  );
}

export function getSitemapGroupById(id: string): SitemapGroup | undefined {
  return SITEMAP_GROUPS.find((group) => group.id === id);
}
