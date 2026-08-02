import { BUSINESS_CONFIG } from "@/config/business";
import { SITE_CONFIG } from "@/config/site";

export function buildArticleSchema(input: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: input.url,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: {
      "@type": "Organization",
      name: input.author ?? BUSINESS_CONFIG.name,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}${BUSINESS_CONFIG.logo}`,
      },
    },
    image: input.image ? `${SITE_CONFIG.url}${input.image}` : `${SITE_CONFIG.url}${BUSINESS_CONFIG.defaultOpenGraphImage}`,
  };
}
