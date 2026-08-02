import { describe, expect, it } from "vitest";
import { isPageIndexable } from "@/lib/seo/is-page-indexable";
import type { PageIndexabilityInput } from "@/types";

function buildIndexableInput(
  overrides: Partial<PageIndexabilityInput> = {},
): PageIndexabilityInput {
  return {
    publicationStatus: "published",
    allowIndexing: true,
    qualityScore: 90,
    contentReviewed: true,
    localDataVerified: true,
    hasUniqueMetadata: true,
    hasUniqueContent: true,
    hasValidCanonical: true,
    hasInternalLinks: true,
    hasValidSchema: true,
    wordCount: 1200,
    minimumRequiredWordCount: 1000,
    similarityScore: 0.2,
    ...overrides,
  };
}

describe("isPageIndexable", () => {
  it("returns true when all gates pass", () => {
    expect(isPageIndexable(buildIndexableInput())).toBe(true);
  });

  it("returns false when word count is below minimum", () => {
    expect(
      isPageIndexable(
        buildIndexableInput({ wordCount: 500, minimumRequiredWordCount: 1000 }),
      ),
    ).toBe(false);
  });

  it("returns false when quality score is below 80", () => {
    expect(isPageIndexable(buildIndexableInput({ qualityScore: 79 }))).toBe(false);
  });

  it("returns false when similarity exceeds threshold", () => {
    expect(isPageIndexable(buildIndexableInput({ similarityScore: 0.71 }))).toBe(false);
  });

  it("returns false when publication status is not published", () => {
    expect(
      isPageIndexable(buildIndexableInput({ publicationStatus: "draft" })),
    ).toBe(false);
  });

  it("returns false when indexing is disallowed", () => {
    expect(isPageIndexable(buildIndexableInput({ allowIndexing: false }))).toBe(false);
  });
});
