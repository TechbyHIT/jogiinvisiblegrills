import type { Metadata } from "next";
import { isPageIndexable } from "@/lib/seo/is-page-indexable";
import type { PageIndexabilityInput } from "@/types";

export function generateRobots(page: PageIndexabilityInput): Metadata["robots"] {
  const indexable = isPageIndexable(page);

  return {
    index: indexable,
    follow: indexable,
    googleBot: {
      index: indexable,
      follow: indexable,
    },
  };
}

export function generateRobotsString(page: PageIndexabilityInput): string {
  const indexable = isPageIndexable(page);
  return indexable ? "index, follow" : "noindex, nofollow";
}
