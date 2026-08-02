import { BUSINESS_CONFIG } from "@/config/business";
import { getServiceBySlug } from "@/data/initial-services";
import { getLocationBySlug } from "@/data/initial-locations";
import { getAreaBySlug } from "@/data/initial-areas";
import { SEARCH_INTENTS, INDEXABLE_INTENTS } from "@/data/search-intents";
import {
  getProgrammaticLocations,
  PROGRAMMATIC_CITIES,
  getProgrammaticAreasByCity,
} from "@/data/programmatic-locations";
import { getProgrammaticServices } from "@/data/programmatic-services";
import {
  buildProgrammaticPath,
  type ParsedProgrammaticSlug,
} from "@/lib/routing/parse-programmatic-slug";

export type ProgrammaticInventory = {
  cities: number;
  areas: number;
  areasByCity: Array<{ city: string; slug: string; count: number }>;
  services: number;
  categories: number;
  keywordsIntents: number;
  indexableIntents: number;
  locations: number;
  layer1ServiceUrls: number;
  layer2ServiceLocationUrls: number;
  layer3IntentUrls: number;
  addressableUrls: number;
  indexableProgrammaticEstimate: number;
  indexableIntentUrls: number;
  warmStaticAtBuild: number;
  hubPagesEstimate: number;
  indexableSitemapEstimate: number;
};

export function computeProgrammaticInventory(): ProgrammaticInventory {
  const services = getProgrammaticServices();
  const locations = getProgrammaticLocations();
  const areas = locations.filter((l) => l.kind === "area");
  const cities = PROGRAMMATIC_CITIES;

  const layer1 = services.length;
  const layer2 = services.length * locations.length;
  const layer3 = services.length * locations.length * SEARCH_INTENTS.length;
  const addressableUrls = layer1 + layer2 + layer3;

  const intentIndexableLocations = locations.filter((l) => l.intentIndexable);
  const indexableIntentUrls =
    services.length * intentIndexableLocations.length * INDEXABLE_INTENTS.length;

  const indexableProgrammaticEstimate = layer1 + layer2 + indexableIntentUrls;
  const hubPagesEstimate = 167;
  const indexableSitemapEstimate = indexableProgrammaticEstimate + hubPagesEstimate;

  const areasByCity = cities.map((city) => ({
    city: city.name,
    slug: city.slug,
    count: getProgrammaticAreasByCity(city.slug).length,
  }));

  return {
    cities: cities.length,
    areas: areas.length,
    areasByCity,
    services: services.length,
    categories: 8,
    keywordsIntents: SEARCH_INTENTS.length,
    indexableIntents: INDEXABLE_INTENTS.length,
    locations: locations.length,
    layer1ServiceUrls: layer1,
    layer2ServiceLocationUrls: layer2,
    layer3IntentUrls: layer3,
    addressableUrls,
    indexableIntentUrls,
    indexableProgrammaticEstimate,
    warmStaticAtBuild: getWarmProgrammaticSlugs().length,
    hubPagesEstimate,
    indexableSitemapEstimate,
  };
}

/** Resolve legacy location/area records for content assembly. */
export function resolveLegacyEntities(parsed: ParsedProgrammaticSlug) {
  const parentService = getServiceBySlug(parsed.service.parentServiceSlug);
  if (!parentService) return null;

  if (parsed.layer === "service") {
    return { service: parentService, location: undefined, area: undefined, intent: undefined };
  }

  const city = PROGRAMMATIC_CITIES.find(
    (c) =>
      parsed.location.kind === "city"
        ? c.slug === parsed.location.slug
        : c.slug === parsed.location.citySlug,
  );
  if (!city) return null;

  const legacyLocation = getLocationBySlug(city.legacySlug);
  if (!legacyLocation) return null;

  if (parsed.location.kind === "city") {
    return {
      service: parentService,
      location: legacyLocation,
      area: undefined,
      intent: parsed.layer === "service-location-intent" ? parsed.intent : undefined,
    };
  }

  const area = getAreaBySlug(city.locationId, parsed.location.slug);
  if (!area) return null;

  return {
    service: parentService,
    location: legacyLocation,
    area,
    intent: parsed.layer === "service-location-intent" ? parsed.intent : undefined,
  };
}

export function getPageMetaFromParsed(parsed: ParsedProgrammaticSlug) {
  switch (parsed.layer) {
    case "service":
      return {
        h1: parsed.service.name,
        title: `${parsed.service.name} | ${BUSINESS_CONFIG.name}`,
        description: `Professional ${parsed.service.name.toLowerCase()} installation in Bengaluru and Mysuru. Measurement-led quotations and warranty-backed installation.`,
      };
    case "service-location": {
      const locName = parsed.location.name;
      return {
        h1: `${parsed.service.name} in ${locName}`,
        title: `Best ${parsed.service.name} in ${locName} | Premium Near Me | ${BUSINESS_CONFIG.name}`,
        description: `Best & premium ${parsed.service.name.toLowerCase()} near me in ${locName}. Free site inspection, measurement-led quotes and professional installation by ${BUSINESS_CONFIG.name}.`,
      };
    }
    case "service-location-intent": {
      const locName = parsed.location.name;
      return {
        h1: `${parsed.service.name} ${parsed.intent.label} in ${locName}`,
        title: `${parsed.service.name} ${parsed.intent.label} in ${locName} | Best Premium Near Me`,
        description: `${parsed.service.name} ${parsed.intent.label.toLowerCase()} in ${locName} — compare best, premium and near me options with honest coverage and measurement-based quotes.`,
      };
    }
  }
}

export function isProgrammaticPageIndexable(parsed: ParsedProgrammaticSlug): boolean {
  if (parsed.layer === "service-location-intent") {
    if (!parsed.intent.allowIndexing) return false;
    if (!parsed.location.intentIndexable) return false;
  }
  return true;
}

export function getCanonicalPath(parsed: ParsedProgrammaticSlug): string {
  if (parsed.layer === "service") {
    return buildProgrammaticPath(parsed.service.slug);
  }
  if (parsed.layer === "service-location-intent") {
    if (!parsed.intent.allowIndexing) {
      return buildProgrammaticPath(parsed.service.slug, parsed.location.slug);
    }
    return buildProgrammaticPath(
      parsed.service.slug,
      parsed.location.slug,
      parsed.intent.slug,
    );
  }
  return buildProgrammaticPath(parsed.service.slug, parsed.location.slug);
}

/** Programmatic URLs pre-rendered at build (remaining routes use ISR on first request). */
export function getWarmProgrammaticSlugs(): string[] {
  return getProgrammaticServices().map((service) => service.slug);
}

export function* iterateAddressableSlugs(): Generator<string> {
  const services = getProgrammaticServices();
  const locations = getProgrammaticLocations();

  for (const service of services) {
    yield service.slug;
  }

  for (const service of services) {
    for (const location of locations) {
      yield `${service.slug}-${location.slug}`;
    }
  }

  for (const service of services) {
    for (const location of locations) {
      for (const intent of SEARCH_INTENTS) {
        yield `${service.slug}-${location.slug}-${intent.slug}`;
      }
    }
  }
}

export function* iterateIndexableSlugs(): Generator<string> {
  const services = getProgrammaticServices();
  const locations = getProgrammaticLocations();

  for (const service of services) {
    yield service.slug;
  }

  for (const service of services) {
    for (const location of locations) {
      yield `${service.slug}-${location.slug}`;
    }
  }

  for (const service of services) {
    for (const location of locations.filter((l) => l.intentIndexable)) {
      for (const intent of INDEXABLE_INTENTS) {
        yield `${service.slug}-${location.slug}-${intent.slug}`;
      }
    }
  }
}
