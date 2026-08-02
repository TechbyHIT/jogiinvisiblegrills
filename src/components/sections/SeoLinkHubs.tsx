import Link from "next/link";
import type { SeoLinkHub } from "@/lib/internal-links/seo-link-hubs";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

type SeoLinkHubsProps = {
  hubs: SeoLinkHub[];
};

/** Categorized internal link blocks — Hiranya-style browse sections. */
export function SeoLinkHubs({ hubs }: SeoLinkHubsProps) {
  if (hubs.length === 0) return null;

  return (
    <div className="seo-link-hubs">
      {hubs.map((hub, index) => (
        <Section key={hub.id} variant={index % 2 === 0 ? "muted" : "default"}>
          <SectionEyebrow>Browse</SectionEyebrow>
          <Heading level={2} className="text-primary mb-2">
            {hub.title}
          </Heading>
          {hub.description && (
            <p className="mb-6 max-w-3xl text-sm text-text-muted leading-relaxed">{hub.description}</p>
          )}
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {hub.links.map((link) => (
              <li key={`${hub.id}-${link.href}`}>
                <Link
                  href={link.href}
                  className="flex h-full items-center rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium text-primary hover:border-gold hover:bg-gold/5 hover:text-gold transition-colors"
                >
                  <span className="text-gold mr-2 shrink-0" aria-hidden="true">→</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ))}
    </div>
  );
}
