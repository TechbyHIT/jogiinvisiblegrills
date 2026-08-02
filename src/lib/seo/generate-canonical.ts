import { SITE_CONFIG } from "@/config/site";

export function generateCanonical(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const withTrailingSlash = normalizedPath.endsWith("/")
    ? normalizedPath
    : `${normalizedPath}/`;

  return `${SITE_CONFIG.url}${withTrailingSlash}`.toLowerCase();
}

export function hasValidCanonical(path: string, canonicalUrl: string): boolean {
  return canonicalUrl === generateCanonical(path);
}
