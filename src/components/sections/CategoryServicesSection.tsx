import Image from "next/image";
import Link from "next/link";
import {
  PROGRAMMATIC_CATEGORIES,
  getProgrammaticServicesByCategory,
} from "@/data/programmatic-services";
import { buildProgrammaticPath } from "@/lib/routing/parse-programmatic-slug";
import { getCategoryCoverImage } from "@/config/finalized-images";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Heading } from "@/components/ui/Heading";

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "invisible-grills":
    "Premium stainless steel invisible grills that protect balconies and windows without blocking your view.",
  "safety-nets":
    "Strong, UV-stabilized safety nets for balconies, terraces and open areas to protect family and property.",
  "balcony-nets":
    "Transparent balcony protection nets that prevent falls and keep children, pets and objects secure.",
  "bird-nets": "Humane bird exclusion nets for balconies, windows, ducts and terraces.",
  "pigeon-nets": "Anti-pigeon nets that stop nesting and mess while staying barely visible.",
  "sports-nets": "Cricket, football and practice nets for schools, academies and home backyards.",
  "cloth-hangers": "Ceiling and balcony cloth drying hangers with smooth pulley operation.",
  "bird-spikes": "Humane bird spike systems for ledges, parapets and AC units.",
};

export function CategoryServicesSection() {
  return (
    <Section variant="muted" id="services">
      <SectionEyebrow>Our Services</SectionEyebrow>
      <Heading level={2} className="text-primary mb-2">
        Complete home &amp; building safety solutions
      </Heading>
      <p className="mb-10 max-w-3xl text-text-muted">
        From invisible grills to safety nets, bird protection and cloth hangers — everything you need
        from one trusted team across Bengaluru &amp; Mysuru. Every category below uses real HD project
        photos from our installation portfolio.
      </p>

      <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {PROGRAMMATIC_CATEGORIES.map((category, index) => {
          const services = getProgrammaticServicesByCategory(category.slug).slice(0, 4);
          const cover = getCategoryCoverImage(category.slug, index + 1);
          return (
            <li
              key={category.slug}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[16/9] bg-surface-alt">
                <Image
                  src={cover}
                  alt={`${category.name} installation — real project photo`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold text-primary">{category.name}</h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed">
                  {CATEGORY_DESCRIPTIONS[category.slug] ??
                    `Professional ${category.name.toLowerCase()} installation.`}
                </p>
                <ul className="mt-4 space-y-2 flex-1">
                  {services.map((svc) => (
                    <li key={svc.slug}>
                      <Link
                        href={buildProgrammaticPath(svc.slug)}
                        className="text-sm font-medium text-primary hover:text-gold transition-colors inline-flex items-center gap-1"
                      >
                        <span aria-hidden="true">→</span> {svc.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={buildProgrammaticPath(services[0]?.slug ?? "invisible-grills")}
                  className="mt-5 text-sm font-semibold text-gold hover:underline"
                >
                  All {category.name.toLowerCase()} →
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
