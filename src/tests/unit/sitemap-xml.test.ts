import { describe, expect, it } from "vitest";
import { getSitemapIndexChildEntries } from "@/lib/sitemap/sitemap-index-entries";
import { buildSitemapIndexXml, buildUrlSetXml } from "@/lib/sitemap/sitemap-xml";
import { buildProgrammaticSitemapXml } from "@/lib/sitemap/programmatic-sitemaps";

describe("sitemap XML", () => {
  it("builds a valid sitemap index (not a urlset of page URLs)", () => {
    const xml = buildSitemapIndexXml([
      { loc: "https://example.com/sitemaps/core.xml", lastmod: "2026-08-02" },
    ]);
    expect(xml).toContain("<sitemapindex");
    expect(xml).toContain("<sitemap>");
    expect(xml).not.toContain("<urlset");
  });

  it("lists legacy groups and programmatic shards in the index", () => {
    const entries = getSitemapIndexChildEntries();
    expect(entries.length).toBeGreaterThan(10);
    expect(entries.some((e) => e.loc.endsWith("/sitemaps/core.xml"))).toBe(true);
    expect(entries.some((e) => e.loc.includes("/sitemaps/programmatic-1.xml"))).toBe(
      true,
    );
    expect(entries.every((e) => e.loc.startsWith("http"))).toBe(true);
  });

  it("escapes ampersands in urlset loc values", () => {
    const xml = buildUrlSetXml([
      { loc: "https://example.com/foo?a=1&b=2/", lastmod: "2026-08-02" },
    ]);
    expect(xml).toContain("&amp;");
    expect(xml).toContain("<urlset");
  });

  it("builds programmatic urlset with trailing slashes", () => {
    const xml = buildProgrammaticSitemapXml(["invisible-grills", "pigeon-nets-bengaluru"]);
    expect(xml).toContain("<loc>https://");
    expect(xml).toContain("/invisible-grills/</loc>");
    expect(xml).toContain("/pigeon-nets-bengaluru/</loc>");
  });
});
