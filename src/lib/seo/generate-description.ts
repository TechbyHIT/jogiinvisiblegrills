import { BUSINESS_CONFIG } from "@/config/business";
import type { PageType } from "@/types";

export type DescriptionInput = {
  pageType: PageType;
  summary?: string;
  locationName?: string;
  areaName?: string;
  serviceName?: string;
  propertyTypeName?: string;
  problemName?: string;
  customDescription?: string;
};

export function generateDescription(input: DescriptionInput): string {
  if (input.customDescription) {
    return truncateDescription(input.customDescription);
  }

  const { pageType, summary, locationName, areaName, serviceName, propertyTypeName, problemName } =
    input;

  switch (pageType) {
    case "core":
      return truncateDescription(BUSINESS_CONFIG.description);
    case "service":
      return truncateDescription(
        summary ??
          `Professional ${serviceName ?? "safety net"} installation with measurement-based quotations and practical safety planning.`,
      );
    case "location":
      return truncateDescription(
        summary ??
          `${serviceName ? `${serviceName} and related installations` : "Invisible grills, balcony safety nets and home protection"} in ${locationName ?? "your area"}. Served localities with honest coverage.`,
      );
    case "area":
      return truncateDescription(
        summary ??
          `Balcony and window safety installations in ${areaName ?? "this locality"}, ${locationName ?? "Karnataka"}. Measurement-led service for apartments and family homes.`,
      );
    case "service-location":
      return truncateDescription(
        summary ??
          `${serviceName ?? "Safety installation"} in ${locationName ?? "your city"}. Site assessment, material guidance and neat finishing for residential projects.`,
      );
    case "service-area":
      return truncateDescription(
        summary ??
          `${serviceName ?? "Safety installation"} in ${areaName ?? "this area"}, ${locationName ?? ""}. Local installation planning for apartments and independent homes.`,
      );
    case "solution":
      return truncateDescription(
        summary ??
          `Practical solutions for ${problemName ?? "common home safety problems"} using invisible grills, safety nets and related installations.`,
      );
    case "property-type-service":
      return truncateDescription(
        summary ??
          `${serviceName ?? "Installation"} recommendations for ${propertyTypeName ?? "your property type"}. Safety planning suited to balconies, windows and utility spaces.`,
      );
    case "guide":
      return truncateDescription(
        summary ?? "In-depth guide with practical advice for home safety and protection installations.",
      );
    case "blog":
      return truncateDescription(
        summary ?? "Practical home safety advice for apartments and family homes in Karnataka.",
      );
    default:
      return truncateDescription(BUSINESS_CONFIG.description);
  }
}

function truncateDescription(text: string, maxLength = 160): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  const truncated = cleaned.slice(0, maxLength - 1);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : truncated.length).trim()}…`;
}
