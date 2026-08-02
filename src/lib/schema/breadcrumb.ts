import { SITE_CONFIG } from "@/config/site";
import type { BreadcrumbItem } from "@/types";

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http") ? item.href : `${SITE_CONFIG.url}${item.href}`,
    })),
  };
}
