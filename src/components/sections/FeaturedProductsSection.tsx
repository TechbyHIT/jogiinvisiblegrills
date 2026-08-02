import Image from "next/image";
import Link from "next/link";
import { buildProgrammaticPath } from "@/lib/routing/parse-programmatic-slug";
import { getHeroForService } from "@/config/finalized-images";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

const FEATURED = [
  {
    badge: "Most Popular",
    title: "Invisible Grills – uninterrupted views, total safety",
    description:
      "Premium stainless steel invisible grills that protect balconies and windows without blocking your view.",
    bullets: [
      "Marine-grade SS304 & SS316 high-tension cables",
      "Child-safe & pet-safe with tight spacing",
      "Almost invisible from a few feet away",
      "Rust-resistant, low-maintenance and durable",
      "Custom-fitted for balconies, windows & high-rises",
    ],
    serviceSlug: "invisible-grills",
    categorySlug: "invisible-grills",
  },
  {
    badge: "Family Favourite",
    title: "Safety Nets – affordable protection that blends in",
    description:
      "Strong, UV-stabilized safety nets for balconies, terraces and open areas to protect family and property.",
    bullets: [
      "UV-stabilized HDPE & nylon nets",
      "Ideal for children, pets and birds",
      "Transparent mesh that preserves your view",
      "Corrosion-free hooks and even tensioning",
      "Quick, clean and budget-friendly installation",
    ],
    serviceSlug: "safety-nets",
    categorySlug: "safety-nets",
  },
] as const;

export function FeaturedProductsSection() {
  return (
    <Section id="featured">
      <SectionEyebrow>Featured</SectionEyebrow>
      <Heading level={2} className="text-primary mb-8">
        Most popular safety solutions
      </Heading>
      <ul className="grid gap-8 lg:grid-cols-2">
        {FEATURED.map((item) => {
          const image = getHeroForService(item.serviceSlug, item.categorySlug);
          return (
            <li
              key={item.serviceSlug}
              className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-[4/3] md:aspect-auto md:min-h-full bg-surface-alt">
                  <Image
                    src={image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={80}
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-dark">
                    {item.badge}
                  </span>
                </div>
                <div className="flex flex-col p-6 md:p-8">
                  <h3 className="font-display text-xl font-semibold text-primary leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-text-muted leading-relaxed">{item.description}</p>
                  <ul className="mt-5 space-y-2 flex-1">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-sm text-text-muted">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                          aria-hidden="true"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button
                      href={buildProgrammaticPath(item.serviceSlug, "bengaluru")}
                      variant="gold"
                      size="sm"
                    >
                      Free site inspection
                    </Button>
                    <Link
                      href={buildProgrammaticPath(item.serviceSlug)}
                      className="inline-flex items-center text-sm font-semibold text-primary hover:text-gold"
                    >
                      View service →
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
