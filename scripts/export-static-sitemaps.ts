/**
 * Writes sitemap urlsets to public/sitemaps/*.xml at build time.
 * Next.js serves these as static files (reliable for Google Search Console crawls).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { BUSINESS_CONFIG } from "../src/config/business";
import { SITE_CONFIG } from "../src/config/site";
import { getIndexablePages } from "../src/lib/pages/registry";
import { SITEMAP_GROUPS } from "../src/lib/sitemap/groups";
import {
  buildProgrammaticSitemapXml,
  getIndexableSlugsForShard,
  getProgrammaticSitemapShardCount,
} from "../src/lib/sitemap/programmatic-sitemaps";
import { buildUrlSetXml, normalizeSiteUrl } from "../src/lib/sitemap/sitemap-xml";
import { sitemapPageUrl } from "../src/lib/sitemap/sitemap-urls";

const outDir = join(process.cwd(), "public", "sitemaps");

function writeGroupSitemaps(base: string) {
  const pages = getIndexablePages();

  for (const group of SITEMAP_GROUPS) {
    const groupPages = pages
      .filter((page) => group.pageTypes.includes(page.pageType))
      .slice(0, SITE_CONFIG.maxSitemapUrlsPerFile);

    const xml = buildUrlSetXml(
      groupPages.map((page) => ({
        loc: sitemapPageUrl(base, page.path),
        lastmod: page.updatedAt.split("T")[0],
        changefreq: group.changefreq,
        priority: group.priority,
      })),
    );

    const file = join(outDir, `${group.id}.xml`);
    writeFileSync(file, xml, "utf8");
    console.log(`  ${group.id}.xml — ${groupPages.length} URLs`);
  }
}

function writeProgrammaticSitemaps() {
  const shardCount = getProgrammaticSitemapShardCount();
  for (let i = 0; i < shardCount; i++) {
    const slugs = getIndexableSlugsForShard(i);
    const xml = buildProgrammaticSitemapXml(slugs);
    const file = join(outDir, `programmatic-${i + 1}.xml`);
    writeFileSync(file, xml, "utf8");
    console.log(`  programmatic-${i + 1}.xml — ${slugs.length} URLs`);
  }
}

function main() {
  mkdirSync(outDir, { recursive: true });
  const base = normalizeSiteUrl(BUSINESS_CONFIG.websiteUrl);

  console.log("Exporting static sitemap files to public/sitemaps/ …");
  writeGroupSitemaps(base);
  writeProgrammaticSitemaps();
  console.log("Static sitemap export complete.");
}

main();
