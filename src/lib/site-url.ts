/** Live canonical host (Search Console + sitemap + schema). */
export const CANONICAL_SITE_HOST = "www.jogiinvisiblegrills.in";

const DEFAULT_SITE_URL = `https://${CANONICAL_SITE_HOST}`;

/**
 * Normalizes NEXT_PUBLIC_SITE_URL to https + www (no trailing slash on origin).
 */
export function resolveCanonicalSiteUrl(raw?: string | null): string {
  const input = raw?.trim() || DEFAULT_SITE_URL;
  try {
    const url = new URL(input.startsWith("http") ? input : `https://${input}`);
    url.protocol = "https:";
    if (url.hostname === "jogiinvisiblegrills.in") {
      url.hostname = CANONICAL_SITE_HOST;
    }
    return url.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export function isLocalDevHost(host: string): boolean {
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".localhost") ||
    host.startsWith("192.168.") ||
    host.startsWith("10.")
  );
}
