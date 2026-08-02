/**
 * Normalise a URL path to always start with / and end with /.
 */
export function normalizePath(path: string): string {
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

/**
 * Extract the final slug segment from a normalised path.
 * Returns "home" for the root path.
 */
export function slugFromPath(path: string): string {
  const normalized = normalizePath(path);
  if (normalized === "/") {
    return "home";
  }
  const segments = normalized.replace(/^\/|\/$/g, "").split("/");
  return segments[segments.length - 1] ?? "home";
}

/**
 * Build a hyphenated slug from arbitrary parts, dropping empty values.
 */
export function joinSlugParts(...parts: Array<string | undefined>): string {
  return parts
    .filter((part): part is string => Boolean(part?.trim()))
    .map((part) =>
      part
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}]+/gu, "-")
        .replace(/^-+|-+$/g, ""),
    )
    .filter(Boolean)
    .join("-");
}

/**
 * Validate that a slug contains only lowercase letters, numbers and hyphens.
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
