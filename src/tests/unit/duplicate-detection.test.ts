import { describe, expect, it } from "vitest";
import {
  computeSimilarityScore,
  findHighestSimilarity,
  jaccardSimilarity,
  tokenize,
} from "@/lib/seo/duplicate-detection";

describe("duplicate detection", () => {
  it("tokenizes text into lowercase word tokens", () => {
    const tokens = tokenize("Balcony Safety Nets in Visakhapatnam!");
    expect(tokens.has("balcony")).toBe(true);
    expect(tokens.has("visakhapatnam")).toBe(true);
  });

  it("computes jaccard similarity between texts", () => {
    const score = jaccardSimilarity(
      "invisible grills balcony safety visakhapatnam",
      "invisible grills window safety visakhapatnam",
    );
    expect(score).toBeGreaterThan(0.3);
    expect(score).toBeLessThan(1);
  });

  it("returns 1 for identical token sets", () => {
    const text = "balcony safety nets installation visakhapatnam";
    expect(jaccardSimilarity(text, text)).toBe(1);
  });

  it("finds highest similarity candidate", () => {
    const result = findHighestSimilarity("invisible grills visakhapatnam apartment", [
      { id: "a", text: "mosquito nets bedroom window" },
      { id: "b", text: "invisible grills visakhapatnam balcony apartment" },
    ]);
    expect(result.id).toBe("b");
    expect(result.score).toBeGreaterThan(0.4);
  });

  it("computes similarity score excluding self", () => {
    const candidates = [
      { id: "page-1", text: "invisible grills visakhapatnam" },
      { id: "page-2", text: "mosquito nets visakhapatnam" },
    ];
    const score = computeSimilarityScore(
      "invisible grills visakhapatnam apartment safety",
      candidates,
      "page-1",
    );
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(1);
  });
});
