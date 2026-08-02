import Link from "next/link";
import type { InternalLink } from "@/types";
import type { ExploreMoreCard } from "@/lib/internal-links/explore-more-types";
import { ExploreMoreSection } from "@/components/sections/explore-more/ExploreMoreSection";
import { Heading } from "@/components/ui/Heading";

type RelatedLinksProps = {
  links?: InternalLink[];
  cards?: ExploreMoreCard[];
  title?: string;
  description?: string;
};

export function RelatedLinks({
  links = [],
  cards,
  title = "Related Pages",
  description,
}: RelatedLinksProps) {
  if (cards && cards.length > 0) {
    return (
      <ExploreMoreSection
        cards={cards}
        title={title}
        description={
          description ??
          "Browse related services, localities, guides and support pages connected to this topic."
        }
        showMobileStickyCta={cards.some((c) => c.id === "book-inspection")}
      />
    );
  }

  if (links.length === 0) return null;

  return (
    <aside className="rounded-lg border border-border bg-surface p-6">
      <Heading level={3} className="text-primary mb-4">
        {title}
      </Heading>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm font-medium text-primary hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
