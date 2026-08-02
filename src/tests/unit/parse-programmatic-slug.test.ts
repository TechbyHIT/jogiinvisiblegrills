import { describe, expect, it } from "vitest";
import { parseProgrammaticSlug, buildProgrammaticPath } from "@/lib/routing/parse-programmatic-slug";

describe("parseProgrammaticSlug", () => {
  it("parses service root", () => {
    const parsed = parseProgrammaticSlug("invisible-grills");
    expect(parsed?.layer).toBe("service");
    expect(parsed && "service" in parsed && parsed.service.slug).toBe("invisible-grills");
  });

  it("parses service-city", () => {
    const parsed = parseProgrammaticSlug("invisible-grills-bengaluru");
    expect(parsed?.layer).toBe("service-location");
    if (parsed?.layer === "service-location") {
      expect(parsed.location.slug).toBe("bengaluru");
    }
  });

  it("parses service-area", () => {
    const parsed = parseProgrammaticSlug("balcony-safety-nets-whitefield");
    expect(parsed?.layer).toBe("service-location");
    if (parsed?.layer === "service-location") {
      expect(parsed.location.slug).toBe("whitefield");
    }
  });

  it("parses service-location-intent", () => {
    const parsed = parseProgrammaticSlug("invisible-grills-whitefield-price");
    expect(parsed?.layer).toBe("service-location-intent");
    if (parsed?.layer === "service-location-intent") {
      expect(parsed.intent.slug).toBe("price");
    }
  });

  it("rejects reserved slugs", () => {
    expect(parseProgrammaticSlug("contact")).toBeNull();
  });

  it("builds paths", () => {
    expect(buildProgrammaticPath("invisible-grills")).toBe("/invisible-grills/");
    expect(buildProgrammaticPath("invisible-grills", "bengaluru")).toBe(
      "/invisible-grills-bengaluru/",
    );
    expect(buildProgrammaticPath("invisible-grills", "whitefield", "price")).toBe(
      "/invisible-grills-whitefield-price/",
    );
  });
});
