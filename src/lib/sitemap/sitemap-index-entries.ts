import { BUSINESS_CONFIG } from "@/config/business";
import { SITEMAP_GROUPS } from "@/lib/sitemap/groups";
import { getProgrammaticSitemapIndexEntries } from "@/lib/sitemap/programmatic-sitemaps";
import { normalizeSiteUrl, type SitemapIndexEntry } from "@/lib/sitemap/sitemap-xml";
import { sitemapChildUrl } from "@/lib/sitemap/sitemap-urls";

/** Child sitemaps referenced from /sitemap.xml (sitemap index). */
export function getSitemapIndexChildEntries(): SitemapIndexEntry[] {
  const base = normalizeSiteUrl(BUSINESS_CONFIG.websiteUrl);
  const lastmod = new Date().toISOString().slice(0, 10);

  const legacy: SitemapIndexEntry[] = SITEMAP_GROUPS.map((group) => ({
    loc: sitemapChildUrl(base, group.id),
    lastmod,
  }));

  const programmatic: SitemapIndexEntry[] = getProgrammaticSitemapIndexEntries().map(
    (entry) => ({
      loc: entry.url,
      lastmod,
    }),
  );

  return [...legacy, ...programmatic];
}
