import { STATIC_ROUTES, areaPath, areaServicePath, blogPath, cityServicePath, guidePath, locationPath, propertyTypeServicePath, servicePath, solutionPath } from "@/config/routes";
import { SITE_CONFIG } from "@/config/site";
import { getPublishedAreas, getAreasByLocationId } from "@/data/initial-areas";
import { getPublishedLocations } from "@/data/initial-locations";
import { getPublishedServices } from "@/data/initial-services";
import { getPublishedBlogPosts } from "@/data/blog-posts";
import { getPublishedGuides } from "@/data/guides";
import { getPublishedProblems } from "@/data/problems";
import { getPublishedPropertyTypes } from "@/data/property-types";
import { getPublishingOverride } from "@/data/publishing-overrides";
import { buildPageRecord } from "@/lib/pages/build-page-record";
import { isPageIndexable } from "@/lib/seo/is-page-indexable";
import type { PageRecord, PageType } from "@/types";

let cachedPages: PageRecord[] | null = null;
let cachedByPath: Map<string, PageRecord> | null = null;

const CORE_TITLES: Record<string, { h1: string; summary?: string }> = {
  "/": { h1: "Home", summary: undefined },
  "/about/": { h1: "About Us" },
  "/contact/": { h1: "Contact Us" },
  "/services/": { h1: "Our Services" },
  "/locations/": { h1: "Service Locations" },
  "/solutions/": { h1: "Safety Solutions" },
  "/property-types/": { h1: "Property Types" },
  "/guides/": { h1: "Guides" },
  "/blog/": { h1: "Blog" },
  "/gallery/": { h1: "Project Gallery" },
  "/projects/": { h1: "Projects" },
  "/testimonials/": { h1: "Customer Testimonials" },
  "/faq/": { h1: "Frequently Asked Questions" },
  "/pricing-guide/": { h1: "Pricing Guide" },
  "/materials-guide/": { h1: "Materials Guide" },
  "/installation-process/": { h1: "Installation Process" },
  "/safety-guide/": { h1: "Safety Guide" },
  "/privacy-policy/": { h1: "Privacy Policy" },
  "/terms-and-conditions/": { h1: "Terms and Conditions" },
  "/disclaimer/": { h1: "Disclaimer" },
  "/thank-you/": { h1: "Thank You", summary: "Thank you for contacting us." },
};

function applyOverride(page: PageRecord): PageRecord {
  const override = getPublishingOverride(page.path);
  if (!override) {
    return page;
  }

  return { ...page, ...override };
}

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

/** Apply title-collision similarity without rebuilding full page content. */
function applySimilarityToPage(page: PageRecord, similarityScore: number): PageRecord {
  if (similarityScore === 0) {
    return page;
  }

  const hasUniqueContent = similarityScore <= 0.7;
  const hasUniqueMetadata = similarityScore <= 0.85;

  let qualityScore = page.qualityScore;
  if (!hasUniqueContent) {
    qualityScore -= 3;
  }
  if (!hasUniqueMetadata) {
    qualityScore -= 3;
  }
  if (similarityScore > SITE_CONFIG.maximumSimilarityScore) {
    qualityScore -= 20;
  } else if (similarityScore > 0.5) {
    qualityScore -= 8;
  }

  return {
    ...page,
    similarityScore,
    hasUniqueContent,
    hasUniqueMetadata,
    qualityScore: clampScore(qualityScore),
  };
}

/**
 * Fast uniqueness pass: exact-title collisions only.
 * Full-content Jaccard across hundreds of pages is too slow; template meta
 * Jaccard false-positives near-duplicate city/area titles. Exact title match
 * catches true doorway duplicates without tanking legitimate variants.
 */
function applyTitleUniquenessPass(pages: PageRecord[]): PageRecord[] {
  const idsByTitle = new Map<string, string[]>();

  for (const page of pages) {
    const key = page.title.trim().toLowerCase();
    const ids = idsByTitle.get(key) ?? [];
    ids.push(page.id);
    idsByTitle.set(key, ids);
  }

  return pages.map((page) => {
    const key = page.title.trim().toLowerCase();
    const collisionCount = idsByTitle.get(key)?.length ?? 1;
    const similarityScore = collisionCount > 1 ? 1 : 0;
    return applyOverride(applySimilarityToPage(page, similarityScore));
  });
}

function generateRegistryPages(): PageRecord[] {
  const services = getPublishedServices();
  const locations = getPublishedLocations();
  const areas = getPublishedAreas();
  const problems = getPublishedProblems();
  const propertyTypes = getPublishedPropertyTypes();
  const guides = getPublishedGuides();
  const blogPosts = getPublishedBlogPosts();

  const draftPages: PageRecord[] = [];

  for (const route of STATIC_ROUTES) {
    const meta = CORE_TITLES[route] ?? { h1: route.replace(/\//g, " ").trim() };
    draftPages.push(
      buildPageRecord({
        id: `core-${route.replace(/\//g, "-") || "home"}`,
        path: route,
        slug: route === "/" ? "home" : route.replace(/^\/|\/$/g, ""),
        pageType: "core",
        h1: meta.h1,
        coreTitle: meta.h1,
        coreSummary: meta.summary,
      }),
    );
  }

  for (const service of services) {
    draftPages.push(
      buildPageRecord({
        id: `service-${service.id}`,
        path: servicePath(service.slug),
        slug: service.slug,
        pageType: "service",
        h1: service.name,
        service,
      }),
    );
  }

  for (const location of locations) {
    draftPages.push(
      buildPageRecord({
        id: `location-${location.id}`,
        path: locationPath(location.slug),
        slug: location.slug,
        pageType: "location",
        h1: `${location.name} Safety Installations`,
        location,
      }),
    );
  }

  for (const area of areas) {
    const location = locations.find((item) => item.id === area.locationId);
    if (!location) {
      continue;
    }

    draftPages.push(
      buildPageRecord({
        id: `area-${area.id}`,
        path: areaPath(location.slug, area.slug),
        slug: area.slug,
        pageType: "area",
        h1: `${area.name}, ${location.name}`,
        location,
        area,
      }),
    );
  }

  for (const location of locations.filter((item) => item.isServed)) {
    for (const service of services) {
      draftPages.push(
        buildPageRecord({
          id: `service-location-${service.id}-${location.id}`,
          path: cityServicePath(location.slug, service.slug),
          slug: `${location.slug}-${service.slug}`,
          pageType: "service-location",
          h1: `${service.name} in ${location.name}`,
          service,
          location,
        }),
      );
    }
  }

  for (const area of areas.filter((item) => item.isServed)) {
    const location = locations.find((item) => item.id === area.locationId);
    if (!location?.isServed) {
      continue;
    }

    for (const service of services) {
      draftPages.push(
        buildPageRecord({
          id: `service-area-${service.id}-${area.id}`,
          path: areaServicePath(location.slug, area.slug, service.slug),
          slug: `${location.slug}-${area.slug}-${service.slug}`,
          pageType: "service-area",
          h1: `${service.name} in ${area.name}, ${location.name}`,
          service,
          location,
          area,
        }),
      );
    }
  }

  for (const problem of problems) {
    draftPages.push(
      buildPageRecord({
        id: `solution-${problem.id}`,
        path: solutionPath(problem.slug),
        slug: problem.slug,
        pageType: "solution",
        h1: problem.name,
        problem,
      }),
    );
  }

  for (const propertyType of propertyTypes) {
    for (const service of services.filter((item) =>
      propertyType.suitableServiceIds.includes(item.id),
    )) {
      draftPages.push(
        buildPageRecord({
          id: `property-type-service-${propertyType.id}-${service.id}`,
          path: propertyTypeServicePath(propertyType.slug, service.slug),
          slug: `${propertyType.slug}-${service.slug}`,
          pageType: "property-type-service",
          h1: `${service.name} for ${propertyType.name}`,
          service,
          propertyType,
        }),
      );
    }
  }

  for (const guide of guides) {
    draftPages.push(
      buildPageRecord({
        id: `guide-${guide.id}`,
        path: guidePath(guide.slug),
        slug: guide.slug,
        pageType: "guide",
        h1: guide.title,
        guide,
      }),
    );
  }

  for (const blogPost of blogPosts) {
    draftPages.push(
      buildPageRecord({
        id: `blog-${blogPost.id}`,
        path: blogPath(blogPost.slug),
        slug: blogPost.slug,
        pageType: "blog",
        h1: blogPost.title,
        blogPost,
      }),
    );
  }

  return applyTitleUniquenessPass(draftPages);
}

function ensureCache(): void {
  if (!cachedPages || !cachedByPath) {
    cachedPages = generateRegistryPages();
    cachedByPath = new Map(cachedPages.map((page) => [page.path, page]));
  }
}

export function getAllPages(): PageRecord[] {
  ensureCache();
  return cachedPages ?? [];
}

export function getPageByPath(path: string): PageRecord | undefined {
  ensureCache();
  const normalized = path.endsWith("/") ? path : `${path}/`;
  return cachedByPath?.get(normalized);
}

export function getPublishedPages(): PageRecord[] {
  return getAllPages().filter((page) => page.publicationStatus === "published");
}

export function getIndexablePages(): PageRecord[] {
  return getPublishedPages().filter((page) => isPageIndexable(page));
}

export function getPagesByType(pageType: PageType): PageRecord[] {
  return getAllPages().filter((page) => page.pageType === pageType);
}

export function paginatePages(
  cursor: number,
  limit: number,
): { items: PageRecord[]; nextCursor: number | null; total: number } {
  const pages = getAllPages();
  const items = pages.slice(cursor, cursor + limit);
  const nextCursor = cursor + limit < pages.length ? cursor + limit : null;

  return {
    items,
    nextCursor,
    total: pages.length,
  };
}

export function getAreasForLocation(locationId: string) {
  return getAreasByLocationId(locationId);
}

export function resetPageRegistryCache(): void {
  cachedPages = null;
  cachedByPath = null;
}
