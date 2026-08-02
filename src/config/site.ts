import { BUSINESS_CONFIG } from "./business";

export const SITE_CONFIG = {
  name: BUSINESS_CONFIG.name,
  url: BUSINESS_CONFIG.websiteUrl,
  locale: "en_IN",
  language: "en",
  trailingSlash: true,
  defaultRevalidateSeconds: 86400,
  maxSitemapUrlsPerFile: 10_000,
  minimumQualityScore: 80,
  maximumSimilarityScore: 0.7,
  adminPath: "/admin",
} as const;
