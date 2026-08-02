import Link from "next/link";
import type { InternalLink } from "@/types";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

type InternalLinkGridProps = {
  links: InternalLink[];
  title?: string;
};

/** Dense internal link grid for programmatic SEO pages. */
export function InternalLinkGrid({
  links,
  title = "Related Services & Localities",
}: InternalLinkGridProps) {
  if (links.length === 0) return null;

  return (
    <Section variant="muted">
      <Heading level={2} className="text-primary mb-2">
        {title}
      </Heading>
      <p className="mb-6 max-w-2xl text-sm text-text-muted">
        Browse related services, localities and keyword pages across Bengaluru and Mysuru.
      </p>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block rounded-md border border-border bg-white px-3 py-2.5 text-xs font-medium text-primary hover:border-gold hover:text-gold transition-colors sm:text-sm"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
