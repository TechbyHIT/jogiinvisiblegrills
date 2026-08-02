import { describe, expect, it } from "vitest";
import { sitemapChildUrl, sitemapPageUrl } from "@/lib/sitemap/sitemap-urls";

describe("sitemap urls", () => {
  it("builds child sitemap loc with trailing slash", () => {
    expect(sitemapChildUrl("https://www.jogiinvisiblegrills.in", "core")).toBe(
      "https://www.jogiinvisiblegrills.in/sitemaps/core.xml",
    );
  });

  it("builds page loc with trailing slash", () => {
    expect(sitemapPageUrl("https://www.jogiinvisiblegrills.in", "/about/")).toBe(
      "https://www.jogiinvisiblegrills.in/about/",
    );
  });
});
