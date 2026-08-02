import {
  generateProgrammaticLinkHubs,
  flattenProgrammaticLinkHubs,
} from "@/lib/internal-links/seo-link-hubs";
import type { ParsedProgrammaticSlug } from "@/lib/routing/parse-programmatic-slug";
import type { InternalLink } from "@/types";

export function generateProgrammaticInternalLinks(
  parsed: ParsedProgrammaticSlug,
): InternalLink[] {
  const hubs = generateProgrammaticLinkHubs(parsed);
  return flattenProgrammaticLinkHubs(hubs);
}

export { generateProgrammaticLinkHubs };
