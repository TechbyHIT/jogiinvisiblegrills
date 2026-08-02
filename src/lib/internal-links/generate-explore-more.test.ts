import { describe, expect, it } from "vitest";
import { hashSeed } from "@/lib/internal-links/generate-explore-more";
import { parseProgrammaticSlug } from "@/lib/routing/parse-programmatic-slug";
import { generateProgrammaticLinkHubs } from "@/lib/internal-links/seo-link-hubs";
import { generateExploreMoreFromProgrammatic } from "@/lib/internal-links/generate-explore-more";

describe("generateExploreMoreFromProgrammatic", () => {
  it("produces different card order for different paths", () => {
    const slugA = "invisible-grills-whitefield";
    const slugB = "invisible-grills-koramangala";
    const parsedA = parseProgrammaticSlug(slugA)!;
    const parsedB = parseProgrammaticSlug(slugB)!;
    const hubsA = generateProgrammaticLinkHubs(parsedA);
    const hubsB = generateProgrammaticLinkHubs(parsedB);
    const cardsA = generateExploreMoreFromProgrammatic(parsedA, hubsA, `/${slugA}/`);
    const cardsB = generateExploreMoreFromProgrammatic(parsedB, hubsB, `/${slugB}/`);
    const orderA = cardsA.map((c) => c.id).join(",");
    const orderB = cardsB.map((c) => c.id).join(",");
    expect(orderA).not.toBe(orderB);
  });

  it("does not repeat hrefs across cards on one page", () => {
    const slug = "pigeon-nets-bengaluru-price";
    const parsed = parseProgrammaticSlug(slug)!;
    const hubs = generateProgrammaticLinkHubs(parsed);
    const cards = generateExploreMoreFromProgrammatic(parsed, hubs, `/${slug}/`);
    const seen = new Set<string>();
    for (const card of cards) {
      for (const link of card.links) {
        expect(seen.has(link.href)).toBe(false);
        seen.add(link.href);
      }
    }
  });
});

describe("hashSeed", () => {
  it("is stable for the same input", () => {
    expect(hashSeed("/foo/")).toBe(hashSeed("/foo/"));
    expect(hashSeed("/foo/")).not.toBe(hashSeed("/bar/"));
  });
});
