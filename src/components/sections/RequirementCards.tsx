import Link from "next/link";
import Image from "next/image";
import { REQUIREMENT_CARDS } from "@/config/trust-content";
import { homeServiceHref } from "@/config/home-content";
import { getHeroForService } from "@/config/finalized-images";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

type RequirementCardsProps = {
  highlightCategory?: string;
};

const CATEGORY_TO_SERVICE: Record<string, string> = {
  "invisible-grills": "invisible-grills",
  "pigeon-nets": "pigeon-nets",
  "safety-nets": "balcony-safety-nets",
  "balcony-nets": "balcony-safety-nets",
  "bird-nets": "pigeon-nets",
  "bird-spikes": "bird-spikes",
  "sports-nets": "sports-nets",
  "cloth-hangers": "cloth-hangers",
};

const CARD_TO_PROGRAMMATIC: Record<string, string> = {
  "pigeon-nets": "pigeon-nets",
  "bird-nets": "bird-nets",
  "balcony-nets": "balcony-nets",
  "safety-nets": "safety-nets",
  "balcony-safety-nets": "balcony-nets",
  "children-safety-nets": "safety-nets",
  "invisible-grills": "invisible-grills",
  "mosquito-nets": "mosquito-nets",
  "sports-nets": "sports-nets",
  "cloth-hangers": "cloth-hangers",
  "bird-spikes": "bird-spikes",
};

function cardLinkSlug(serviceSlug: string): string {
  return CARD_TO_PROGRAMMATIC[serviceSlug] ?? serviceSlug;
}

function isCardHighlighted(
  card: (typeof REQUIREMENT_CARDS)[number],
  highlightCategory?: string,
): boolean {
  if (!highlightCategory) return false;
  const legacySlug = CATEGORY_TO_SERVICE[highlightCategory];
  const linkSlug = cardLinkSlug(card.serviceSlug);
  return (
    linkSlug === highlightCategory ||
    card.serviceSlug === legacySlug ||
    card.id === highlightCategory
  );
}

export function RequirementCards({ highlightCategory }: RequirementCardsProps) {
  return (
    <Section id="requirements">
      <SectionEyebrow>Explore Solutions</SectionEyebrow>
      <Heading level={2} className="text-primary mb-2">
        What are you looking for?
      </Heading>
      <p className="mb-8 max-w-2xl text-sm text-text-muted">
        Tell us your requirement and get instant solutions — each card links to a detailed service
        page with materials, process and locality coverage.
      </p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {REQUIREMENT_CARDS.map((card, index) => {
          const linkSlug = cardLinkSlug(card.serviceSlug);
          const categorySlug =
            card.serviceSlug === "children-safety-nets" ? "safety-nets" : linkSlug;
          const image = getHeroForService(card.serviceSlug, categorySlug, index * 7 + 3);
          return (
          <li key={card.id}>
            <Link
              href={homeServiceHref(linkSlug, "bengaluru")}
              className={`group flex h-full flex-col overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isCardHighlighted(card, highlightCategory)
                  ? "border-accent ring-1 ring-accent/30 shadow-md"
                  : "border-border"
              }`}
            >
              <div className="relative aspect-[16/9] bg-surface-alt">
                <Image
                  src={image}
                  alt={`${card.title} — real project photo`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 20vw"
                  quality={80}
                  loading={index < 5 ? "eager" : "lazy"}
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg font-semibold text-primary group-hover:text-accent">
                {card.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-text-muted">{card.description}</p>
              <span className="mt-4 text-sm font-semibold text-accent">Explore &rarr;</span>
              </div>
            </Link>
          </li>
          );
        })}
      </ul>
    </Section>
  );
}
