import { getPageByPath, getPublishedPages, getIndexablePages } from "@/lib/pages/registry";
import { isPageIndexable } from "@/lib/seo/is-page-indexable";
import type { PageRecord } from "@/types";

export function getPublishedPageByPath(path: string): PageRecord | null {
  const page = getPageByPath(path);
  if (!page || page.publicationStatus !== "published") {
    return null;
  }

  return page;
}

export function getIndexablePageByPath(path: string): PageRecord | null {
  const page = getPublishedPageByPath(path);
  if (!page || !isPageIndexable(page)) {
    return null;
  }

  return page;
}

export function assertPublishedPage(path: string): PageRecord {
  const page = getPublishedPageByPath(path);
  if (!page) {
    throw new Error(`Published page not found for path: ${path}`);
  }

  return page;
}

export function getPublishedPageCount(): number {
  return getPublishedPages().length;
}

export function getIndexablePageCount(): number {
  return getIndexablePages().length;
}

export function isPublishedPath(path: string): boolean {
  return getPublishedPageByPath(path) !== null;
}

export function isIndexablePath(path: string): boolean {
  return getIndexablePageByPath(path) !== null;
}
