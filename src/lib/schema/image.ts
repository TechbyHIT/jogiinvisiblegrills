import { SITE_CONFIG } from "@/config/site";

export function buildImageSchema(input: {
  url: string;
  caption?: string;
  name?: string;
}) {
  const absoluteUrl = input.url.startsWith("http")
    ? input.url
    : `${SITE_CONFIG.url}${input.url}`;

  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: absoluteUrl,
    url: absoluteUrl,
    ...(input.caption ? { caption: input.caption } : {}),
    ...(input.name ? { name: input.name } : {}),
  };
}
