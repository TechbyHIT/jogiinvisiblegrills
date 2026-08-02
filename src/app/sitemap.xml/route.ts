import { NextResponse } from "next/server";
import { getSitemapIndexChildEntries } from "@/lib/sitemap/sitemap-index-entries";
import { buildSitemapIndexXml, SITEMAP_XML_HEADERS } from "@/lib/sitemap/sitemap-xml";

export const revalidate = 86400;

/** Root sitemap index — points to grouped urlsets + programmatic shards. */
export async function GET() {
  const entries = getSitemapIndexChildEntries();
  const xml = buildSitemapIndexXml(entries);

  return new NextResponse(xml, { headers: SITEMAP_XML_HEADERS });
}
