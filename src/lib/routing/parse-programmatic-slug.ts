import { getSearchIntentBySlug, getIntentSlugsSortedByLength } from "@/data/search-intents";
import {
  getProgrammaticLocationBySlug,
  getProgrammaticLocations,
} from "@/data/programmatic-locations";
import {
  getProgrammaticServiceBySlug,
  getProgrammaticServices,
} from "@/data/programmatic-services";
import type { SearchIntent } from "@/data/search-intents";
import type { ProgrammaticLocation } from "@/data/programmatic-locations";
import type { ProgrammaticService } from "@/data/programmatic-services";

export type ParsedProgrammaticSlug =
  | { layer: "service"; service: ProgrammaticService }
  | {
      layer: "service-location";
      service: ProgrammaticService;
      location: ProgrammaticLocation;
    }
  | {
      layer: "service-location-intent";
      service: ProgrammaticService;
      location: ProgrammaticLocation;
      intent: SearchIntent;
    };

/** Reserved single-segment slugs handled by other routes. */
export const RESERVED_SLUGS = new Set([
  "about",
  "contact",
  "services",
  "locations",
  "solutions",
  "property-types",
  "guides",
  "blog",
  "gallery",
  "projects",
  "testimonials",
  "faq",
  "pricing-guide",
  "materials-guide",
  "installation-process",
  "safety-guide",
  "privacy-policy",
  "terms-and-conditions",
  "disclaimer",
  "thank-you",
  "admin",
  "api",
  "bangalore",
  "bengaluru",
  "mysore",
  "mysuru",
  "visakhapatnam",
]);

function getLocationSlugsSorted(): string[] {
  return getProgrammaticLocations()
    .map((l) => l.slug)
    .sort((a, b) => b.length - a.length);
}

function getServiceSlugsSorted(): string[] {
  return getProgrammaticServices()
    .map((s) => s.slug)
    .sort((a, b) => b.length - a.length);
}

function parseServiceLocation(
  slug: string,
): { service: ProgrammaticService; location: ProgrammaticLocation } | null {
  for (const serviceSlug of getServiceSlugsSorted()) {
    const prefix = `${serviceSlug}-`;
    if (!slug.startsWith(prefix)) continue;

    const locationPart = slug.slice(prefix.length);
    const location = getProgrammaticLocationBySlug(locationPart);
    const service = getProgrammaticServiceBySlug(serviceSlug);

    if (service && location) {
      return { service, location };
    }
  }
  return null;
}

export function parseProgrammaticSlug(rawSlug: string): ParsedProgrammaticSlug | null {
  const slug = rawSlug.replace(/\/$/, "").toLowerCase();
  if (!slug || RESERVED_SLUGS.has(slug)) return null;

  const exactService = getProgrammaticServiceBySlug(slug);
  if (exactService) {
    return { layer: "service", service: exactService };
  }

  for (const intentSlug of getIntentSlugsSortedByLength()) {
    const suffix = `-${intentSlug}`;
    if (!slug.endsWith(suffix)) continue;

    const base = slug.slice(0, -suffix.length);
    const parsed = parseServiceLocation(base);
    const intent = getSearchIntentBySlug(intentSlug);

    if (parsed && intent) {
      return {
        layer: "service-location-intent",
        service: parsed.service,
        location: parsed.location,
        intent,
      };
    }
  }

  const serviceLocation = parseServiceLocation(slug);
  if (serviceLocation) {
    return { layer: "service-location", ...serviceLocation };
  }

  return null;
}

/** Build flat URL path from parsed slug parts. */
export function buildProgrammaticPath(
  serviceSlug: string,
  locationSlug?: string,
  intentSlug?: string,
): string {
  let path = `/${serviceSlug}`;
  if (locationSlug) path += `-${locationSlug}`;
  if (intentSlug) path += `-${intentSlug}`;
  return `${path}/`;
}

export function programmaticPathToSlug(path: string): string {
  return path.replace(/^\/|\/$/g, "");
}
