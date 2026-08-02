import { describe, expect, it } from "vitest";
import {
  cityServicePath,
  guidePath,
  locationPath,
  servicePath,
} from "@/config/routes";
import {
  isValidSlug,
  joinSlugParts,
  normalizePath,
  slugFromPath,
} from "@/lib/routes/slug-helpers";

describe("slug helpers", () => {
  it("normalizes paths with leading and trailing slashes", () => {
    expect(normalizePath("services/invisible-grills")).toBe("/services/invisible-grills/");
    expect(normalizePath("/about")).toBe("/about/");
  });

  it("extracts slug from path", () => {
    expect(slugFromPath("/")).toBe("home");
    expect(slugFromPath("/services/invisible-grills/")).toBe("invisible-grills");
  });

  it("joins slug parts safely", () => {
    expect(joinSlugParts("Visakhapatnam", "Invisible Grills")).toBe(
      "visakhapatnam-invisible-grills",
    );
    expect(joinSlugParts("  ", undefined, "Balcony Nets")).toBe("balcony-nets");
  });

  it("validates slug format", () => {
    expect(isValidSlug("invisible-grills")).toBe(true);
    expect(isValidSlug("Invisible Grills")).toBe(false);
    expect(isValidSlug("bad--slug")).toBe(false);
  });
});

describe("route helpers", () => {
  it("builds service paths", () => {
    expect(servicePath("invisible-grills")).toBe("/services/invisible-grills/");
  });

  it("builds location paths", () => {
    expect(locationPath("visakhapatnam")).toBe("/locations/visakhapatnam/");
  });

  it("builds city service paths", () => {
    expect(cityServicePath("visakhapatnam", "invisible-grills")).toBe(
      "/visakhapatnam/invisible-grills/",
    );
  });

  it("builds guide paths", () => {
    expect(guidePath("balcony-safety-checklist")).toBe("/guides/balcony-safety-checklist/");
  });
});
