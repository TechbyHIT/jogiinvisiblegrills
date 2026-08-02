import { BUSINESS_CONFIG } from "@/config/business";
import { SITE_CONFIG } from "@/config/site";
import {
  areaPath,
  areaServicePath,
  cityServicePath,
  locationPath,
  servicePath,
} from "@/config/routes";
import type { AreaRecord, BreadcrumbItem, LocationRecord, ServiceRecord } from "@/types";
import type { AssembledPageContent } from "@/lib/content/assemble-page-content";

export function absoluteUrl(path: string): string {
  return `${SITE_CONFIG.url}${path}`;
}

export function buildServiceBreadcrumbs(service: ServiceRecord): BreadcrumbItem[] {
  return [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services/" },
    { name: service.shortName, href: servicePath(service.slug) },
  ];
}

export function buildLocationBreadcrumbs(location: LocationRecord): BreadcrumbItem[] {
  return [
    { name: "Home", href: "/" },
    { name: "Locations", href: "/locations/" },
    { name: location.name, href: locationPath(location.slug) },
  ];
}

export function buildAreaBreadcrumbs(
  location: LocationRecord,
  area: AreaRecord,
): BreadcrumbItem[] {
  return [
    ...buildLocationBreadcrumbs(location),
    { name: area.name, href: areaPath(location.slug, area.slug) },
  ];
}

export function buildCityServiceBreadcrumbs(
  location: LocationRecord,
  service: ServiceRecord,
): BreadcrumbItem[] {
  return [
    { name: "Home", href: "/" },
    { name: "Locations", href: "/locations/" },
    { name: location.name, href: locationPath(location.slug) },
    {
      name: `${service.shortName} in ${location.name}`,
      href: cityServicePath(location.slug, service.slug),
    },
  ];
}

export function buildAreaServiceBreadcrumbs(
  location: LocationRecord,
  area: AreaRecord,
  service: ServiceRecord,
): BreadcrumbItem[] {
  return [
    { name: "Home", href: "/" },
    { name: location.name, href: locationPath(location.slug) },
    { name: area.name, href: areaPath(location.slug, area.slug) },
    {
      name: service.shortName,
      href: areaServicePath(location.slug, area.slug, service.slug),
    },
  ];
}

export function serviceFaqsFromContent(
  service: ServiceRecord,
): Array<{ question: string; answer: string }> {
  return service.customerQuestions.map((question, index) => ({
    question,
    answer:
      service.safetyInformation[index] ??
      service.maintenanceTips[index] ??
      service.benefits[index] ??
      BUSINESS_CONFIG.pricingStatement,
  }));
}

export function sectionAnchorId(sectionId: string): string {
  return sectionId;
}

export type ContentSectionProps = {
  content: AssembledPageContent;
};
