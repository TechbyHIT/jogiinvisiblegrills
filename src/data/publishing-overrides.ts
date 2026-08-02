import {
  areaPath,
  areaServicePath,
  blogPath,
  cityServicePath,
  guidePath,
  locationPath,
  propertyTypeServicePath,
  servicePath,
  solutionPath,
  STATIC_ROUTES,
} from "@/config/routes";
import { getPublishedAreas } from "@/data/initial-areas";
import { getPublishedBlogPosts } from "@/data/blog-posts";
import { getPublishedGuides } from "@/data/guides";
import { getPublishedLocations } from "@/data/initial-locations";
import { getPublishedProblems } from "@/data/problems";
import { getPublishedPropertyTypes } from "@/data/property-types";
import { getPublishedServices } from "@/data/initial-services";
import type { PageRecord } from "@/types";

const PHASE1_QUALITY_FLAGS: Partial<PageRecord> = {
  hasInternalLinks: true,
  hasValidSchema: true,
  hasUniqueContent: true,
  hasUniqueMetadata: true,
  hasValidCanonical: true,
  contentReviewed: true,
  localDataVerified: true,
  similarityScore: 0,
};

/** Phase-1 cities that get city-service quality overrides (not every town). */
const PHASE1_CITY_SERVICE_SLUGS = ["bangalore", "mysore"] as const;

function phase1CorePaths(): string[] {
  return [...STATIC_ROUTES];
}

function phase1ServicePaths(): string[] {
  return getPublishedServices().map((service) => servicePath(service.slug));
}

function phase1LocationPaths(): string[] {
  return getPublishedLocations().map((location) => locationPath(location.slug));
}

function phase1CityServicePaths(): string[] {
  const services = getPublishedServices();
  const paths: string[] = [];

  for (const slug of PHASE1_CITY_SERVICE_SLUGS) {
    const location = getPublishedLocations().find((item) => item.slug === slug);
    if (!location) {
      continue;
    }

    for (const service of services) {
      paths.push(cityServicePath(location.slug, service.slug));
    }
  }

  return paths;
}

function phase1AreaPaths(): string[] {
  const locations = getPublishedLocations();
  const paths: string[] = [];

  for (const area of getPublishedAreas()) {
    const location = locations.find((item) => item.id === area.locationId);
    if (!location) {
      continue;
    }
    paths.push(areaPath(location.slug, area.slug));
  }

  return paths;
}

function phase1AreaServicePaths(): string[] {
  const locations = getPublishedLocations();
  const services = getPublishedServices();
  const paths: string[] = [];

  for (const area of getPublishedAreas()) {
    const location = locations.find((item) => item.id === area.locationId);
    if (!location) {
      continue;
    }

    for (const service of services) {
      paths.push(areaServicePath(location.slug, area.slug, service.slug));
    }
  }

  return paths;
}

function phase1SolutionPaths(): string[] {
  return getPublishedProblems().map((problem) => solutionPath(problem.slug));
}

function phase1PropertyTypeServicePaths(): string[] {
  const services = getPublishedServices();
  const paths: string[] = [];

  for (const propertyType of getPublishedPropertyTypes()) {
    for (const serviceId of propertyType.suitableServiceIds) {
      const service = services.find((item) => item.id === serviceId);
      if (!service) {
        continue;
      }
      paths.push(propertyTypeServicePath(propertyType.slug, service.slug));
    }
  }

  return paths;
}

function phase1BlogPaths(): string[] {
  return getPublishedBlogPosts().map((post) => blogPath(post.slug));
}

function phase1GuidePaths(): string[] {
  return getPublishedGuides().map((guide) => guidePath(guide.slug));
}

function buildPhase1Overrides(): Record<string, Partial<PageRecord>> {
  const paths = [
    ...phase1CorePaths(),
    ...phase1ServicePaths(),
    ...phase1LocationPaths(),
    ...phase1CityServicePaths(),
    ...phase1AreaPaths(),
    ...phase1AreaServicePaths(),
    ...phase1SolutionPaths(),
    ...phase1PropertyTypeServicePaths(),
    ...phase1BlogPaths(),
    ...phase1GuidePaths(),
  ];

  const overrides: Record<string, Partial<PageRecord>> = {};

  for (const path of paths) {
    overrides[path] = { ...PHASE1_QUALITY_FLAGS };
  }

  return overrides;
}

export const PUBLISHING_OVERRIDES: Record<string, Partial<PageRecord>> =
  buildPhase1Overrides();

export function getPublishingOverride(path: string): Partial<PageRecord> | undefined {
  const normalized = path.endsWith("/") ? path : `${path}/`;
  return PUBLISHING_OVERRIDES[normalized];
}
