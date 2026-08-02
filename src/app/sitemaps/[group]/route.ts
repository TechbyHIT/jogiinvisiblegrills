import { NextResponse } from "next/server";
import { BUSINESS_CONFIG } from "@/config/business";
import { SITE_CONFIG } from "@/config/site";
import { getIndexablePages } from "@/lib/pages/registry";
import { getSitemapGroupById } from "@/lib/sitemap/groups";
import {
  buildProgrammaticSitemapXml,
  getIndexableSlugsForShard,
  getProgrammaticSitemapShardCount,
} from "@/lib/sitemap/programmatic-sitemaps";
import {
  buildUrlSetXml,
  normalizeSiteUrl,
  SITEMAP_XML_HEADERS,
} from "@/lib/sitemap/sitemap-xml";

type RouteContext = {
  params: Promise<{ group: string }>;
};

export const revalidate = 86400;

export async function GET(_request: Request, context: RouteContext) {
  const { group } = await context.params;
  const groupId = group.replace(/\.xml$/, "");

  const programmaticMatch = /^programmatic-(\d+)$/.exec(groupId);
  if (programmaticMatch) {
    const shardNumber = Number(programmaticMatch[1]);
    const shardCount = getProgrammaticSitemapShardCount();
    if (!Number.isFinite(shardNumber) || shardNumber < 1 || shardNumber > shardCount) {
      return new NextResponse("Sitemap shard not found", { status: 404 });
    }
    const slugs = getIndexableSlugsForShard(shardNumber - 1);
    const xml = buildProgrammaticSitemapXml(slugs);
    return new NextResponse(xml, { headers: SITEMAP_XML_HEADERS });
  }

  const sitemapGroup = getSitemapGroupById(groupId);

  if (!sitemapGroup) {
    return new NextResponse("Sitemap group not found", { status: 404 });
  }

  const base = normalizeSiteUrl(BUSINESS_CONFIG.websiteUrl);
  const pages = getIndexablePages()
    .filter((page) => sitemapGroup.pageTypes.includes(page.pageType))
    .slice(0, SITE_CONFIG.maxSitemapUrlsPerFile);

  const xml = buildUrlSetXml(
    pages.map((page) => ({
      loc: `${base}${page.path.startsWith("/") ? page.path : `/${page.path}`}`,
      lastmod: page.updatedAt.split("T")[0],
      changefreq: sitemapGroup.changefreq,
      priority: sitemapGroup.priority,
    })),
  );

  return new NextResponse(xml, { headers: SITEMAP_XML_HEADERS });
}
