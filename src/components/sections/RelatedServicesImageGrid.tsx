import Image from "next/image";
import Link from "next/link";
import type { InternalLink } from "@/types";
import { getRelatedServiceImages } from "@/config/finalized-images";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Heading } from "@/components/ui/Heading";

type RelatedServicesImageGridProps = {
  links: InternalLink[];
  title?: string;
  description?: string;
  limit?: number;
};

/** Visual related-service cards with real HD project photos. */
export function RelatedServicesImageGrid({
  links,
  title = "Related services & local pages",
  description = "Browse related installations with real project photos — same premium materials and professional finishing across Bengaluru & Mysuru.",
  limit = 6,
}: RelatedServicesImageGridProps) {
  const items = getRelatedServiceImages(links, limit);
  if (items.length === 0) return null;

  return (
    <Section id="related-services">
      <SectionEyebrow>Related Services</SectionEyebrow>
      <Heading level={2} className="text-primary mb-2">
        {title}
      </Heading>
      <p className="mb-8 max-w-3xl text-sm text-text-muted leading-relaxed">{description}</p>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="relative aspect-[16/10] bg-surface-alt">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-display text-sm font-semibold text-primary group-hover:text-accent leading-snug">
                  {item.label}
                </h3>
                <span className="mt-3 text-xs font-semibold text-gold">View details →</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
