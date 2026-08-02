import Image from "next/image";
import Link from "next/link";
import { getHeroForService } from "@/config/finalized-images";
import { HOME_SERVICE_SHOWCASE, homeServiceHref } from "@/config/home-content";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

type ServiceShowcaseSectionProps = {
  citySlug?: "bengaluru" | "mysuru";
};

/** All services with real HD photos — image-first cards for the homepage. */
export function ServiceShowcaseSection({ citySlug = "bengaluru" }: ServiceShowcaseSectionProps) {
  const cityLabel = citySlug === "mysuru" ? "Mysuru" : "Bengaluru";

  return (
    <Section id="service-showcase">
      <SectionEyebrow>Our Safety Net Services</SectionEyebrow>
      <Heading level={2} className="text-primary mb-2">
        All services for {cityLabel} homes &amp; buildings
      </Heading>
      <p className="mb-8 max-w-3xl text-text-muted">
        Invisible grills, safety nets, pigeon nets, bird nets, mosquito nets, sports nets, cloth
        hangers and bird spikes — premium materials, professional installation and free site
        inspection across Bengaluru &amp; Mysuru.
      </p>

      {/* Quick browse — all services as image tiles */}
      <ul className="mb-10 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
        {HOME_SERVICE_SHOWCASE.map((item, index) => {
          const image = getHeroForService(item.serviceSlug, item.categorySlug, index + item.seed);
          return (
            <li key={`thumb-${item.serviceSlug}`}>
              <Link
                href={homeServiceHref(item.serviceSlug, citySlug)}
                className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-white p-2 text-center shadow-sm transition-shadow hover:border-gold hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-md bg-surface-alt">
                  <Image
                    src={image}
                    alt={`${item.title} in ${cityLabel}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 33vw, 10vw"
                    quality={75}
                    loading="lazy"
                  />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-primary leading-tight line-clamp-2 group-hover:text-gold">
                  {item.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Detailed cards — every service with image, copy and links */}
      <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {HOME_SERVICE_SHOWCASE.map((item, index) => {
          const image = getHeroForService(item.serviceSlug, item.categorySlug, index + item.seed + 2);
          return (
            <li
              key={item.serviceSlug}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <Link
                href={homeServiceHref(item.serviceSlug, citySlug)}
                className="group block"
              >
                <div className="relative aspect-[16/10] bg-surface-alt">
                  <Image
                    src={image}
                    alt={`${item.title} installation in ${cityLabel}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={80}
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                </div>
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-semibold text-primary">{item.title}</h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed line-clamp-3">
                  {item.description}
                </p>
                <ul className="mt-3 space-y-1.5 flex-1">
                  {item.bullets.slice(0, 3).map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-xs text-text-muted">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                        aria-hidden="true"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Button
                    href={homeServiceHref(item.serviceSlug, citySlug)}
                    variant="gold"
                    size="sm"
                  >
                    View details
                  </Button>
                  <Link
                    href={homeServiceHref(item.serviceSlug, citySlug, "near-me")}
                    className="text-xs font-semibold text-primary hover:text-gold transition-colors"
                  >
                    Near me →
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
