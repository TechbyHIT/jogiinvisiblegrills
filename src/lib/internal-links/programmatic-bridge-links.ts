import {
  areaPath,
  areaServicePath,
  cityServicePath,
  locationPath,
  servicePath,
} from "@/config/routes";
import { buildProgrammaticPath } from "@/lib/routing/parse-programmatic-slug";
import { INDEXABLE_INTENTS } from "@/data/search-intents";
import { getProgrammaticServices } from "@/data/programmatic-services";
import type { InternalLink } from "@/types";

/** Map legacy city slugs to programmatic flat-URL city slugs. */
export function toProgrammaticCitySlug(legacySlug: string): string | null {
  if (legacySlug === "bangalore") return "bengaluru";
  if (legacySlug === "mysore") return "mysuru";
  return null;
}

/** Find programmatic service slug matching a legacy service slug or parent. */
export function toProgrammaticServiceSlug(legacyServiceSlug: string): string {
  const match = getProgrammaticServices().find(
    (s) => s.slug === legacyServiceSlug || s.parentServiceSlug === legacyServiceSlug,
  );
  return match?.slug ?? legacyServiceSlug;
}

/** Add flat programmatic SEO links alongside legacy hierarchical URLs. */
export function appendProgrammaticSeoLinks(input: {
  locationSlug: string;
  areaSlug?: string;
  serviceSlug: string;
  serviceName: string;
  areaName?: string;
  locationName: string;
}): InternalLink[] {
  const citySlug = toProgrammaticCitySlug(input.locationSlug);
  if (!citySlug) return [];

  const progService = toProgrammaticServiceSlug(input.serviceSlug);
  const locSlug = input.areaSlug ?? citySlug;
  const locLabel = input.areaName ?? input.locationName;

  const links: InternalLink[] = [
    {
      href: buildProgrammaticPath(progService, locSlug),
      label: `${input.serviceName} in ${locLabel} (SEO hub)`,
    },
  ];

  for (const intent of INDEXABLE_INTENTS) {
    links.push({
      href: buildProgrammaticPath(progService, locSlug, intent.slug),
      label: `${input.serviceName} ${intent.label} ${locLabel}`,
    });
  }

  return links;
}

/** Bridge links: legacy URL + programmatic equivalent for crawlers. */
export function dualRouteLinks(input: {
  locationSlug: string;
  areaSlug?: string;
  serviceSlug: string;
  serviceShortName: string;
  areaName?: string;
  locationName: string;
}): InternalLink[] {
  const legacy: InternalLink[] = [];

  if (input.areaSlug) {
    legacy.push({
      href: areaServicePath(input.locationSlug, input.areaSlug, input.serviceSlug),
      label: `${input.serviceShortName} in ${input.areaName}`,
    });
    legacy.push({
      href: areaPath(input.locationSlug, input.areaSlug),
      label: `${input.areaName} locality`,
    });
  } else {
    legacy.push({
      href: cityServicePath(input.locationSlug, input.serviceSlug),
      label: `${input.serviceShortName} in ${input.locationName}`,
    });
  }

  legacy.push(
    { href: servicePath(input.serviceSlug), label: input.serviceShortName },
    { href: locationPath(input.locationSlug), label: input.locationName },
  );

  return [...legacy, ...appendProgrammaticSeoLinks({
    locationSlug: input.locationSlug,
    areaSlug: input.areaSlug,
    serviceSlug: input.serviceSlug,
    serviceName: input.serviceShortName,
    areaName: input.areaName,
    locationName: input.locationName,
  })];
}
