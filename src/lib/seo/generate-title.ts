import { SITE_CONFIG } from "@/config/site";
import { SEO_CONFIG } from "@/config/seo";
import type { PageType } from "@/types";

export type TitleInput = {
  pageType: PageType;
  title: string;
  locationName?: string;
  areaName?: string;
  serviceName?: string;
  propertyTypeName?: string;
  problemName?: string;
};

export function generateTitle(input: TitleInput): string {
  const { pageType, title, locationName, areaName, serviceName, propertyTypeName, problemName } =
    input;
  const separator = SEO_CONFIG.titleSeparator;
  const siteName = SITE_CONFIG.name;

  switch (pageType) {
    case "core":
      return title === "Home" ? siteName : `${title}${separator}${siteName}`;
    case "service":
      return `${serviceName ?? title} Installation${separator}${siteName}`;
    case "location":
      return `${locationName ?? title} Safety Net Services${separator}${siteName}`;
    case "area":
      return `${areaName ?? title}, ${locationName ?? ""} Installations${separator}${siteName}`.replace(
        `${separator}${siteName}`,
        `${separator}${siteName}`,
      );
    case "service-location":
      return `${serviceName ?? title} in ${locationName ?? "Your City"}${separator}${siteName}`;
    case "service-area":
      return `${serviceName ?? title} in ${areaName ?? title}, ${locationName ?? ""}${separator}${siteName}`;
    case "solution":
      return `${problemName ?? title} Solutions${separator}${siteName}`;
    case "property-type-service":
      return `${serviceName ?? title} for ${propertyTypeName ?? "Homes"}${separator}${siteName}`;
    case "guide":
      return `${title}${separator}Guide${separator}${siteName}`;
    case "blog":
      return `${title}${separator}Blog${separator}${siteName}`;
    default:
      return `${title}${separator}${siteName}`;
  }
}
