import { describe, expect, it } from "vitest";
import { generateCanonical, hasValidCanonical } from "@/lib/seo/generate-canonical";

describe("generateCanonical", () => {
  it("builds lowercase absolute URLs with trailing slash", () => {
    expect(generateCanonical("/services/invisible-grills/")).toBe(
      "https://www.jogiinvisiblegrills.in/services/invisible-grills/",
    );
  });

  it("adds leading slash when missing", () => {
    expect(generateCanonical("about/")).toMatch(/\/about\/$/);
  });

  it("validates canonical against path", () => {
    const path = "/locations/bangalore/";
    const canonical = generateCanonical(path);
    expect(hasValidCanonical(path, canonical)).toBe(true);
    expect(hasValidCanonical(path, "https://example.com/wrong/")).toBe(false);
  });
});
