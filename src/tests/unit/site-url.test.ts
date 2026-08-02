import { describe, expect, it } from "vitest";
import { resolveCanonicalSiteUrl, CANONICAL_SITE_HOST } from "@/lib/site-url";

describe("resolveCanonicalSiteUrl", () => {
  it("defaults to https www", () => {
    expect(resolveCanonicalSiteUrl(undefined)).toBe(`https://${CANONICAL_SITE_HOST}`);
  });

  it("upgrades apex to www", () => {
    expect(resolveCanonicalSiteUrl("https://jogiinvisiblegrills.in")).toBe(
      `https://${CANONICAL_SITE_HOST}`,
    );
  });

  it("strips trailing slash on origin", () => {
    expect(resolveCanonicalSiteUrl("https://www.jogiinvisiblegrills.in/")).toBe(
      `https://${CANONICAL_SITE_HOST}`,
    );
  });

  it("forces https", () => {
    expect(resolveCanonicalSiteUrl("http://www.jogiinvisiblegrills.in")).toBe(
      `https://${CANONICAL_SITE_HOST}`,
    );
  });
});
