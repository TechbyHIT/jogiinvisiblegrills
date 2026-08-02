/** Child sitemap URLs (trailing slash matches `trailingSlash: true`). */
export function sitemapChildUrl(base: string, id: string): string {
  const normalized = base.replace(/\/+$/, "");
  const file = id.endsWith(".xml") ? id : `${id}.xml`;
  return `${normalized}/sitemaps/${file}/`;
}

export function sitemapPageUrl(base: string, path: string): string {
  const normalized = base.replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  const withSlash = p.endsWith("/") ? p : `${p}/`;
  return `${normalized}${withSlash}`.toLowerCase();
}
