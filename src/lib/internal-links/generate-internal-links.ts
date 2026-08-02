import {
  areaPath,
  areaServicePath,
  cityServicePath,
  guidePath,
  locationPath,
  servicePath,
  solutionPath,
} from "@/config/routes";
import { getPublishedAreas, getAreaById } from "@/data/initial-areas";
import { getPublishedLocations } from "@/data/initial-locations";
import { getPublishedServices } from "@/data/initial-services";
import { getPublishedGuides } from "@/data/guides";
import { getPublishedProblems } from "@/data/problems";
import { dualRouteLinks } from "@/lib/internal-links/programmatic-bridge-links";
import type { InternalLink, PageRecord } from "@/types";

const MAX_AREA_LINKS = 24;
const MAX_SERVICE_LINKS = 16;

function uniqueLinks(links: InternalLink[]): InternalLink[] {
  const seen = new Map<string, InternalLink>();
  for (const link of links) {
    seen.set(link.href, link);
  }
  return [...seen.values()];
}

function nearbyAreaLinks(
  locationSlug: string,
  areaId: string,
  service?: { slug: string; shortName: string },
): InternalLink[] {
  const area = getAreaById(areaId);
  if (!area) return [];

  return area.nearbyAreaIds
    .map((id) => getAreaById(id))
    .filter(Boolean)
    .slice(0, 6)
    .map((nearby) => ({
      href: service
        ? areaServicePath(locationSlug, nearby!.slug, service.slug)
        : areaPath(locationSlug, nearby!.slug),
      label: service
        ? `${service.shortName} in ${nearby!.name}`
        : nearby!.name,
    }));
}

export function generateInternalLinks(page: PageRecord): InternalLink[] {
  const links: InternalLink[] = [{ href: "/", label: "Home" }];

  switch (page.pageType) {
    case "service": {
      const service = getPublishedServices().find((item) => item.id === page.serviceId);
      if (service) {
        links.push(
          { href: "/services/", label: "All Services" },
          ...getPublishedLocations()
            .slice(0, 4)
            .map((location) => ({
              href: cityServicePath(location.slug, service.slug),
              label: `${service.shortName} in ${location.name}`,
            })),
          ...service.relatedServiceIds
            .map((id) => getPublishedServices().find((item) => item.id === id))
            .filter(Boolean)
            .slice(0, 4)
            .map((item) => ({
              href: servicePath(item!.slug),
              label: item!.shortName,
            })),
          ...getPublishedGuides()
            .slice(0, 2)
            .map((guide) => ({
              href: guidePath(guide.slug),
              label: guide.title,
            })),
        );
      }
      break;
    }
    case "location": {
      const location = getPublishedLocations().find((item) => item.id === page.locationId);
      if (location) {
        const areas = getPublishedAreas().filter((item) => item.locationId === location.id);
        links.push(
          { href: "/locations/", label: "All Locations" },
          ...getPublishedServices().map((service) => ({
            href: cityServicePath(location.slug, service.slug),
            label: `${service.shortName} in ${location.name}`,
          })),
          ...areas.slice(0, MAX_AREA_LINKS).map((area) => ({
            href: areaPath(location.slug, area.slug),
            label: `${area.name} safety installations`,
          })),
          ...getPublishedProblems()
            .slice(0, 3)
            .map((problem) => ({
              href: solutionPath(problem.slug),
              label: problem.name,
            })),
        );
      }
      break;
    }
    case "service-location": {
      const location = getPublishedLocations().find((item) => item.id === page.locationId);
      const service = getPublishedServices().find((item) => item.id === page.serviceId);
      if (location && service) {
        const areas = getPublishedAreas().filter((item) => item.locationId === location.id);
        links.push(
          { href: locationPath(location.slug), label: location.name },
          { href: servicePath(service.slug), label: service.shortName },
          { href: "/services/", label: "All Services" },
          ...dualRouteLinks({
            locationSlug: location.slug,
            serviceSlug: service.slug,
            serviceShortName: service.shortName,
            locationName: location.name,
          }),
          ...areas.slice(0, MAX_AREA_LINKS).map((area) => ({
            href: areaServicePath(location.slug, area.slug, service.slug),
            label: `${service.shortName} in ${area.name}`,
          })),
          ...areas.slice(0, MAX_AREA_LINKS).flatMap((area) =>
            dualRouteLinks({
              locationSlug: location.slug,
              areaSlug: area.slug,
              serviceSlug: service.slug,
              serviceShortName: service.shortName,
              areaName: area.name,
              locationName: location.name,
            }).slice(0, 4),
          ),
          ...service.relatedServiceIds
            .map((id) => getPublishedServices().find((item) => item.id === id))
            .filter(Boolean)
            .slice(0, 3)
            .map((item) => ({
              href: cityServicePath(location.slug, item!.slug),
              label: `${item!.shortName} in ${location.name}`,
            })),
        );
      }
      break;
    }
    case "area": {
      const location = getPublishedLocations().find((item) => item.id === page.locationId);
      const area = getPublishedAreas().find((item) => item.id === page.areaId);
      if (location && area) {
        links.push(
          { href: locationPath(location.slug), label: `${location.name} hub` },
          { href: "/locations/", label: "All Locations" },
          ...getPublishedServices().map((service) => ({
            href: areaServicePath(location.slug, area.slug, service.slug),
            label: `${service.shortName} in ${area.name}`,
          })),
          ...nearbyAreaLinks(location.slug, area.id),
          ...getPublishedGuides()
            .slice(0, 2)
            .map((guide) => ({
              href: guidePath(guide.slug),
              label: guide.title,
            })),
        );
      }
      break;
    }
    case "service-area": {
      const location = getPublishedLocations().find((item) => item.id === page.locationId);
      const area = getPublishedAreas().find((item) => item.id === page.areaId);
      const service = getPublishedServices().find((item) => item.id === page.serviceId);
      if (location && area && service) {
        links.push(
          { href: areaPath(location.slug, area.slug), label: `${area.name} locality hub` },
          { href: cityServicePath(location.slug, service.slug), label: `${service.shortName} in ${location.name}` },
          { href: servicePath(service.slug), label: service.shortName },
          { href: locationPath(location.slug), label: location.name },
          ...dualRouteLinks({
            locationSlug: location.slug,
            areaSlug: area.slug,
            serviceSlug: service.slug,
            serviceShortName: service.shortName,
            areaName: area.name,
            locationName: location.name,
          }),
          ...nearbyAreaLinks(location.slug, area.id, service),
          ...getPublishedServices()
            .filter((item) => item.id !== service.id)
            .slice(0, MAX_SERVICE_LINKS - 1)
            .map((item) => ({
              href: areaServicePath(location.slug, area.slug, item.slug),
              label: `${item.shortName} in ${area.name}`,
            })),
          ...getPublishedProblems()
            .slice(0, 2)
            .map((problem) => ({
              href: solutionPath(problem.slug),
              label: problem.name,
            })),
        );
      }
      break;
    }
    case "solution": {
      const problem = getPublishedProblems().find((item) => item.id === page.problemId);
      if (problem) {
        links.push(
          { href: "/solutions/", label: "All Solutions" },
          ...problem.relatedServiceIds
            .map((id) => getPublishedServices().find((item) => item.id === id))
            .filter(Boolean)
            .slice(0, 4)
            .map((item) => ({
              href: servicePath(item!.slug),
              label: item!.shortName,
            })),
          ...getPublishedLocations()
            .slice(0, 3)
            .flatMap((location) =>
              problem.relatedServiceIds
                .slice(0, 1)
                .map((serviceId) => {
                  const service = getPublishedServices().find((item) => item.id === serviceId);
                  if (!service) return null;
                  return {
                    href: cityServicePath(location.slug, service.slug),
                    label: `${service.shortName} in ${location.name}`,
                  };
                })
                .filter(Boolean) as InternalLink[],
            ),
        );
      }
      break;
    }
    case "guide": {
      links.push(
        { href: "/guides/", label: "All Guides" },
        ...getPublishedGuides()
          .filter((guide) => guide.id !== page.guideId)
          .slice(0, 4)
          .map((guide) => ({
            href: guidePath(guide.slug),
            label: guide.title,
          })),
        ...getPublishedServices()
          .slice(0, 3)
          .map((service) => ({
            href: servicePath(service.slug),
            label: service.shortName,
          })),
      );
      break;
    }
    case "blog": {
      links.push(
        { href: "/blog/", label: "All Blog Posts" },
        ...getPublishedGuides()
          .slice(0, 3)
          .map((guide) => ({
            href: guidePath(guide.slug),
            label: guide.title,
          })),
        ...getPublishedServices()
          .slice(0, 3)
          .map((service) => ({
            href: servicePath(service.slug),
            label: service.shortName,
          })),
      );
      break;
    }
    default: {
      links.push(
        { href: "/services/", label: "Services" },
        { href: "/locations/", label: "Locations" },
        { href: "/gallery/", label: "Gallery" },
        { href: "/guides/", label: "Guides" },
        { href: "/contact/", label: "Contact" },
      );
    }
  }

  return uniqueLinks(links);
}
