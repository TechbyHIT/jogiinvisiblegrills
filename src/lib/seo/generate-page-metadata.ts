import type { Metadata } from "next";
import { BUSINESS_CONFIG } from "@/config/business";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import { generateDescription } from "@/lib/seo/generate-description";
import { generateRobots } from "@/lib/seo/generate-robots";
import { generateTitle } from "@/lib/seo/generate-title";
import type { PageRecord } from "@/types";

export function generatePageMetadata(page: PageRecord): Metadata {
  const title = page.title || generateTitle({
    pageType: page.pageType,
    title: page.h1,
    locationName: undefined,
    serviceName: undefined,
  });

  const description =
    page.metaDescription ||
    generateDescription({
      pageType: page.pageType,
      customDescription: page.metaDescription,
    });

  const canonical = page.canonicalUrl || generateCanonical(page.path);
  const ogImage = page.openGraphImage || BUSINESS_CONFIG.defaultOpenGraphImage;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: generateRobots(page),
    openGraph: {
      title: page.openGraphTitle || title,
      description: page.openGraphDescription || description,
      url: canonical,
      siteName: BUSINESS_CONFIG.name,
      locale: "en_IN",
      type: page.pageType === "blog" || page.pageType === "guide" ? "article" : "website",
      images: [
        {
          url: ogImage,
          alt: page.openGraphImageAlt || title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.twitterTitle || title,
      description: page.twitterDescription || description,
      images: [ogImage],
    },
  };
}
