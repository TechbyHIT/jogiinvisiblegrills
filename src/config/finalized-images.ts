import {
  PROJECT_IMAGES_BY_CATEGORY,
  type ProjectImage,
} from "@/config/project-images.generated";
import { BUSINESS_CONFIG } from "@/config/business";
import { parseProgrammaticSlug } from "@/lib/routing/parse-programmatic-slug";

export type GalleryImage = ProjectImage;

const CATEGORY_LABELS: Record<string, string> = {
  "invisible-grills": "Invisible grills",
  "safety-nets": "Safety nets",
  "balcony-nets": "Balcony safety nets",
  "pigeon-nets": "Pigeon nets",
  "bird-nets": "Bird nets",
  "mosquito-nets": "Mosquito nets",
  "sports-nets": "Sports nets",
  "cloth-hangers": "Cloth hangers",
  "bird-spikes": "Bird spikes",
};

const LEGACY_SERVICE_CATEGORY: Record<string, string> = {
  "invisible-grills": "invisible-grills",
  "balcony-safety-nets": "balcony-nets",
  "children-safety-nets": "safety-nets",
  "mosquito-nets": "mosquito-nets",
  "bird-spikes": "bird-spikes",
  "cricket-nets": "sports-nets",
  "cloth-hangers": "cloth-hangers",
  "duct-area-nets": "safety-nets",
  "pet-safety-nets": "safety-nets",
};

const SERVICE_IMAGE_CATEGORY: Record<string, string> = {
  "mosquito-nets": "mosquito-nets",
  "sliding-mosquito-nets": "mosquito-nets",
  "openable-mosquito-nets": "mosquito-nets",
  "balcony-safety-nets": "balcony-nets",
  "children-safety-nets": "safety-nets",
  "pet-safety-nets": "safety-nets",
  "pigeon-nets": "pigeon-nets",
  "anti-pigeon-nets": "pigeon-nets",
  "bird-nets": "bird-nets",
  "anti-bird-nets": "bird-nets",
  "cricket-nets": "sports-nets",
  "sports-nets": "sports-nets",
  "bird-spikes": "bird-spikes",
  "invisible-grills": "invisible-grills",
  "safety-nets": "safety-nets",
  "balcony-nets": "balcony-nets",
  "cloth-hangers": "cloth-hangers",
};

function resolveCategory(serviceSlug: string, categorySlug: string): string {
  if (SERVICE_IMAGE_CATEGORY[serviceSlug]) return SERVICE_IMAGE_CATEGORY[serviceSlug]!;
  if (categorySlug && poolForCategory(categorySlug).length > 0) return categorySlug;
  if (categorySlug) return categorySlug;
  return legacyCategory(serviceSlug);
}

function legacyCategory(serviceSlug: string): string {
  if (serviceSlug.includes("pigeon") || serviceSlug.includes("bird")) {
    if (poolForCategory("pigeon-nets").length > 0) return "pigeon-nets";
    return "bird-nets";
  }
  if (serviceSlug.includes("invisible") || serviceSlug.includes("grill")) return "invisible-grills";
  if (serviceSlug.includes("mosquito")) return "mosquito-nets";
  if (serviceSlug.includes("cricket") || serviceSlug.includes("sports")) return "sports-nets";
  if (serviceSlug.includes("cloth") || serviceSlug.includes("hanger")) return "cloth-hangers";
  if (serviceSlug.includes("spike")) return "bird-spikes";
  return LEGACY_SERVICE_CATEGORY[serviceSlug] ?? "safety-nets";
}

function poolForCategory(category: string): ProjectImage[] {
  return PROJECT_IMAGES_BY_CATEGORY[category] ?? [];
}

function allProjectImages(): ProjectImage[] {
  return Object.values(PROJECT_IMAGES_BY_CATEGORY).flat();
}

/** Curated HD heroes — JPG/WebP first (avoid low-res PNG placeholders). */
const CURATED_HERO_BY_CATEGORY: Record<string, string[]> = {
  "invisible-grills": [
    "/images/projects/invisible-grills/fp0-i11.jpg",
    "/images/projects/invisible-grills/fp0-i14.jpg",
    "/images/projects/invisible-grills/fp0-i15.jpg",
    "/images/projects/invisible-grills/fp0-n24.jpg",
    "/images/projects/invisible-grills/fp0-n25.jpg",
    "/images/projects/invisible-grills/fp0-n29.jpg",
    "/images/projects/invisible-grills/fp0-i12.jpg",
    "/images/projects/invisible-grills/fp0-n22.jpg",
  ],
  "balcony-nets": [
    "/images/projects/balcony-nets/fp0-b1.jpg",
    "/images/projects/balcony-nets/fp0-b10.jpg",
    "/images/projects/balcony-nets/fp1-b1.jpg",
  ],
  "safety-nets": [
    "/images/projects/balcony-nets/fp0-b12.jpg",
    "/images/projects/balcony-nets/fp0-n52.jpg",
  ],
};

function isHighQualityPhotoSrc(src: string): boolean {
  return /\.(jpe?g|webp|avif)$/i.test(src) && !src.endsWith(".svg");
}

function pickHeroFromPool(pool: ProjectImage[], seed: number, categoryHint?: string): string | undefined {
  if (pool.length === 0) return undefined;

  const categoryKey =
    categoryHint ??
    (pool[0]?.src.includes("/invisible-grills/")
      ? "invisible-grills"
      : pool[0]?.src.includes("/balcony-nets/")
        ? "balcony-nets"
        : undefined);

  const curated = categoryKey ? CURATED_HERO_BY_CATEGORY[categoryKey] : undefined;
  if (curated) {
    const available = curated.filter((src) => pool.some((p) => p.src === src));
    if (available.length > 0) return available[seed % available.length];
  }

  const hdPool = pool.filter((p) => isHighQualityPhotoSrc(p.src));
  const source = hdPool.length > 0 ? hdPool : pool;
  return source[seed % source.length]?.src;
}

export function getHomeHeroImage(): string {
  const pool = poolForCategory("invisible-grills");
  return pickHeroFromPool(pool, 2, "invisible-grills") ?? getDefaultOpenGraphImage();
}

function pickFromPool(pool: ProjectImage[], seed: number, count: number): ProjectImage[] {
  if (pool.length === 0) return [];
  const unique: ProjectImage[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < pool.length && unique.length < count; i++) {
    const image = pool[(seed + i * 7) % pool.length]!;
    if (seen.has(image.src)) continue;
    seen.add(image.src);
    unique.push(image);
  }
  return unique;
}

function mergedPool(...categories: string[]): ProjectImage[] {
  const seen = new Set<string>();
  const merged: ProjectImage[] = [];
  for (const category of categories) {
    for (const image of poolForCategory(category)) {
      if (seen.has(image.src)) continue;
      seen.add(image.src);
      merged.push(image);
    }
  }
  return merged;
}

export function buildSeoImageAlt(
  serviceSlug: string,
  categorySlug: string,
  context?: { serviceName?: string; locationName?: string },
): string {
  const category = resolveCategory(serviceSlug, categorySlug);
  const label =
    context?.serviceName ??
    CATEGORY_LABELS[category] ??
    category.replace(/-/g, " ");
  const place = context?.locationName ? ` in ${context.locationName}` : " in Bengaluru & Mysuru";
  return `${label} installation${place} — real project photo by ${BUSINESS_CONFIG.name}`;
}

export function getDefaultProjectImage(): string {
  return allProjectImages()[0]?.src ?? "/images/gallery/hero.svg";
}

export function getDefaultOpenGraphImage(): string {
  const grillHero = pickHeroFromPool(poolForCategory("invisible-grills"), 0);
  if (grillHero) return grillHero;
  const net = poolForCategory("safety-nets").find((p) => isHighQualityPhotoSrc(p.src));
  return net?.src ?? getDefaultProjectImage();
}

export function getSiteGalleryImages(count = 12): GalleryImage[] {
  const pools = [
    "invisible-grills",
    "safety-nets",
    "balcony-nets",
    "pigeon-nets",
    "bird-nets",
    "mosquito-nets",
    "sports-nets",
    "cloth-hangers",
    "bird-spikes",
  ];
  const merged = mergedPool(...pools);
  return pickFromPool(merged, 3, count);
}

/** Homepage gallery — real photos from every service line (2 per service by default). */
export function getHomeServicesGalleryImages(perService = 2): GalleryImage[] {
  const slugs = [
    "invisible-grills",
    "safety-nets",
    "balcony-nets",
    "pigeon-nets",
    "bird-nets",
    "mosquito-nets",
    "sports-nets",
    "cloth-hangers",
    "bird-spikes",
  ];
  const images: GalleryImage[] = [];
  const seen = new Set<string>();
  const targetCount = slugs.length * perService;

  for (const [index, slug] of slugs.entries()) {
    const label = CATEGORY_LABELS[slug] ?? slug.replace(/-/g, " ");
    const picks = getImagesForService(slug, slug, index * 13 + 5, perService, {
      serviceName: label,
    });
    for (const image of picks) {
      if (seen.has(image.src)) continue;
      seen.add(image.src);
      images.push(image);
    }
  }

  if (images.length < targetCount) {
    const backfill = pickFromPool(allProjectImages(), 42, targetCount - images.length);
    for (const image of backfill) {
      if (seen.has(image.src)) continue;
      seen.add(image.src);
      images.push(image);
    }
  }

  return images;
}

/** Full gallery page — HD photos from every category. */
export function getGalleryPageImages(perCategory = 6): GalleryImage[] {
  const categories = Object.keys(PROJECT_IMAGES_BY_CATEGORY);
  const images: GalleryImage[] = [];
  const seen = new Set<string>();

  for (const [index, category] of categories.entries()) {
    const label = CATEGORY_LABELS[category] ?? category.replace(/-/g, " ");
    const pool = poolForCategory(category);
    const picks = pickFromPool(pool, index * 19 + 7, perCategory);

    for (const [photoIndex, image] of picks.entries()) {
      if (seen.has(image.src)) continue;
      seen.add(image.src);
      images.push({
        ...image,
        alt: `${label} — photo ${photoIndex + 1} installation in Bengaluru & Mysuru — real project photo by ${BUSINESS_CONFIG.name}`,
      });
    }
  }

  return images;
}

export function getCategoryCoverImage(categorySlug: string, seed = 0): string {
  const pool = poolForCategory(categorySlug);
  if (pool.length > 0) return pool[seed % pool.length]!.src;
  const resolved = resolveCategory("", categorySlug);
  const fallback = poolForCategory(resolved);
  if (fallback.length > 0) return fallback[seed % fallback.length]!.src;
  return getDefaultProjectImage();
}

export function getHeroForService(
  serviceSlug: string,
  categorySlug: string,
  seed = 0,
): string {
  const category = resolveCategory(serviceSlug, categorySlug);
  const pool = mergedPool(category, categorySlug, legacyCategory(serviceSlug));
  const hero = pickHeroFromPool(pool, seed, category);
  if (hero) return hero;
  return getDefaultProjectImage();
}

export function getImagesForService(
  serviceSlug: string,
  categorySlug: string,
  seed: number,
  count = 16,
  context?: { serviceName?: string; locationName?: string },
): ProjectImage[] {
  const category = resolveCategory(serviceSlug, categorySlug);
  const pool = mergedPool(category, categorySlug);
  const picks = pickFromPool(pool, seed, count);

  if (picks.length === 0) {
    return pickFromPool(allProjectImages(), seed, Math.min(count, 8));
  }

  if (!context?.serviceName && !context?.locationName) return picks;

  return picks.map((image, index) => ({
    ...image,
    alt: buildSeoImageAlt(serviceSlug, categorySlug, {
      ...context,
      serviceName: context?.serviceName
        ? `${context.serviceName} — photo ${index + 1}`
        : undefined,
    }),
  }));
}

export function getImageForHref(href: string, seed = 0): string {
  const slug = href.replace(/^\/|\/$/g, "");
  const parsed = parseProgrammaticSlug(slug);
  if (parsed) {
    return getHeroForService(parsed.service.slug, parsed.service.categorySlug, seed);
  }
  const serviceSlug = slug.split("-")[0] ?? slug;
  return getHeroForService(serviceSlug, serviceSlug, seed);
}

export function getRelatedServiceImages(
  links: Array<{ href: string; label: string }>,
  limit = 6,
): Array<{ href: string; label: string; src: string; alt: string }> {
  return links.slice(0, limit).map((link, index) => {
    const slug = link.href.replace(/^\/|\/$/g, "");
    const parsed = parseProgrammaticSlug(slug);
    const serviceSlug = parsed?.service.slug ?? slug;
    const categorySlug = parsed?.service.categorySlug ?? serviceSlug;
    const src = getHeroForService(serviceSlug, categorySlug, index + 2);
    const locationName =
      parsed && parsed.layer !== "service" ? parsed.location.name : undefined;
    return {
      ...link,
      src,
      alt: buildSeoImageAlt(serviceSlug, categorySlug, {
        serviceName: link.label,
        locationName,
      }),
    };
  });
}

/** @deprecated Use getImagesForService */
export function getImagesForCategory(categorySlug: string, seed: number) {
  return getImagesForService("", categorySlug, seed, 6);
}

/** @deprecated Use getHeroForService */
export function getHeroForCategory(categorySlug: string): string {
  return getHeroForService("", categorySlug);
}

export function hasProjectPhotos(categorySlug: string): boolean {
  return poolForCategory(categorySlug).length > 0;
}

export function getProjectPhotoCount(): number {
  return allProjectImages().length;
}
