import { describe, expect, it } from "vitest";
import {
  getAllPages,
  getIndexablePages,
  getPublishedPages,
  paginatePages,
  resetPageRegistryCache,
} from "@/lib/pages/registry";

describe("page registry", () => {
  it("returns more than zero pages", () => {
    resetPageRegistryCache();
    expect(getAllPages().length).toBeGreaterThan(0);
    expect(getPublishedPages().length).toBeGreaterThan(0);
  }, 120000);

  it("returns indexable pages after quality gates", () => {
    resetPageRegistryCache();
    const indexable = getIndexablePages();
    expect(indexable.length).toBeGreaterThan(0);
    for (const page of indexable) {
      expect(page.wordCount).toBeGreaterThanOrEqual(page.minimumRequiredWordCount);
      expect(page.qualityScore).toBeGreaterThanOrEqual(80);
    }
  }, 120000);
});

describe("paginatePages", () => {
  it("returns paginated slices with cursor", () => {
    resetPageRegistryCache();
    const first = paginatePages(0, 10);
    expect(first.items.length).toBeLessThanOrEqual(10);
    expect(first.total).toBe(getAllPages().length);

    if (first.nextCursor !== null) {
      const second = paginatePages(first.nextCursor, 10);
      expect(second.items[0]?.id).not.toBe(first.items[0]?.id);
    }
  }, 120000);

  it("returns null next cursor on final page", () => {
    resetPageRegistryCache();
    const total = getAllPages().length;
    const last = paginatePages(Math.max(total - 5, 0), 10);
    expect(last.nextCursor).toBeNull();
  }, 120000);
});
