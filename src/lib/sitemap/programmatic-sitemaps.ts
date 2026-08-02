import { BUSINESS_CONFIG } from "@/config/business";
import { computeProgrammaticInventory, iterateIndexableSlugs } from "@/lib/pages/programmatic-inventory";
import {
  buildUrlSetXml,
  normalizeSiteUrl,
} from "@/lib/sitemap/sitemap-xml";

/** Google max is 50,000 URLs per sitemap file. */
export const PROGRAMMATIC_SITEMAP_CHUNK_SIZE = 40_000;

export function getProgrammaticSitemapShardCount(): number {
  const inventory = computeProgrammaticInventory();
  return Math.max(
    1,
    Math.ceil(inventory.indexableProgrammaticEstimate / PROGRAMMATIC_SITEMAP_CHUNK_SIZE),
  );
}

export function getProgrammaticSitemapIndexEntries(): Array<{
  id: string;
  url: string;
}> {
  const base = normalizeSiteUrl(BUSINESS_CONFIG.websiteUrl);
  const count = getProgrammaticSitemapShardCount();
  return Array.from({ length: count }, (_, i) => ({
    id: `programmatic-${i + 1}`,
    url: `${base}/sitemaps/programmatic-${i + 1}.xml`,
  }));
}

export function getIndexableSlugsForShard(shardIndex: number): string[] {
  const start = shardIndex * PROGRAMMATIC_SITEMAP_CHUNK_SIZE;
  const end = start + PROGRAMMATIC_SITEMAP_CHUNK_SIZE;
  const slugs: string[] = [];
  let i = 0;
  for (const slug of iterateIndexableSlugs()) {
    if (i >= end) break;
    if (i >= start) slugs.push(slug);
    i++;
  }
  return slugs;
}

export function buildProgrammaticSitemapXml(slugs: string[]): string {
  const base = normalizeSiteUrl(BUSINESS_CONFIG.websiteUrl);
  const lastmod = new Date().toISOString().slice(0, 10);

  return buildUrlSetXml(
    slugs.map((slug) => ({
      loc: `${base}/${slug}/`,
      lastmod,
      changefreq: "weekly",
      priority: 0.6,
    })),
  );
}
