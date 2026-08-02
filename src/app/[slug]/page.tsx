import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { parseProgrammaticSlug, buildProgrammaticPath } from "@/lib/routing/parse-programmatic-slug";
import {
  getPageMetaFromParsed,
  getWarmProgrammaticSlugs,
  isProgrammaticPageIndexable,
  getCanonicalPath,
  resolveLegacyEntities,
} from "@/lib/pages/programmatic-inventory";
import { assembleProgrammaticContent } from "@/lib/content/assemble-programmatic-content";
import {
  generateProgrammaticInternalLinks,
  generateProgrammaticLinkHubs,
} from "@/lib/internal-links/generate-programmatic-links";
import { generateExploreMoreFromProgrammatic } from "@/lib/internal-links/generate-explore-more";
import { getImagesForService, getHeroForService } from "@/config/finalized-images";
import { createExpansionContext } from "@/lib/content/programmatic-content-expansion";
import { ServiceDetailLayout } from "@/components/pages/ServiceDetailLayout";
import { absoluteUrl } from "@/lib/pages/page-helpers";
import type { BreadcrumbItem } from "@/types";

export const revalidate = 86400;
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ slug: string }>;
};

function buildBreadcrumbs(parsed: NonNullable<ReturnType<typeof parseProgrammaticSlug>>): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ name: "Home", href: "/" }];

  items.push({
    name: parsed.service.name,
    href: buildProgrammaticPath(parsed.service.slug),
  });

  if (parsed.layer !== "service") {
    items.push({
      name: parsed.location.name,
      href: buildProgrammaticPath(parsed.service.slug, parsed.location.slug),
    });
  }

  if (parsed.layer === "service-location-intent") {
    items.push({
      name: parsed.intent.label,
      href: buildProgrammaticPath(
        parsed.service.slug,
        parsed.location.slug,
        parsed.intent.slug,
      ),
    });
  }

  return items;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseProgrammaticSlug(slug);
  if (!parsed) return {};

  const meta = getPageMetaFromParsed(parsed);
  const indexable = isProgrammaticPageIndexable(parsed);
  const canonical = getCanonicalPath(parsed);

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: absoluteUrl(canonical) },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export function generateStaticParams() {
  return getWarmProgrammaticSlugs().map((slug) => ({ slug }));
}

export default async function ProgrammaticFlatPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseProgrammaticSlug(slug);
  if (!parsed) notFound();

  const entities = resolveLegacyEntities(parsed);
  if (!entities) notFound();

  const content = assembleProgrammaticContent({
    programmaticService: parsed.service,
    parentService: entities.service,
    location: entities.location,
    area: entities.area,
    intent: entities.intent,
  });

  const expansionCtx = createExpansionContext({
    service: parsed.service,
    parentService: entities.service,
    locationName: entities.location?.name,
    state: entities.location?.state,
    placeName: entities.area?.name ?? entities.location?.name,
    intent: entities.intent,
  });

  const galleryImages = getImagesForService(
    parsed.service.slug,
    parsed.service.categorySlug,
    expansionCtx.seed,
    24,
    {
      serviceName: parsed.service.name,
      locationName: entities.area?.name ?? entities.location?.name,
    },
  );
  const seoLinkHubs = generateProgrammaticLinkHubs(parsed);
  const exploreMoreCards = generateExploreMoreFromProgrammatic(
    parsed,
    seoLinkHubs,
    getCanonicalPath(parsed),
  );
  const relatedLinks = generateProgrammaticInternalLinks(parsed);
  const nearbyLinks =
    seoLinkHubs.find((h) => h.id === "top-localities")?.links ?? relatedLinks;

  const locationLabel =
    entities.area?.name && entities.location?.name
      ? `${entities.area.name}, ${entities.location.name}`
      : entities.location?.name ?? "Bengaluru & Mysuru";

  const meta = getPageMetaFromParsed(parsed);
  const pageUrl = absoluteUrl(getCanonicalPath(parsed));

  return (
    <ServiceDetailLayout
      service={entities.service}
      content={content}
      breadcrumbs={buildBreadcrumbs(parsed)}
      pageUrl={pageUrl}
      pageTitle={meta.title}
      pageDescription={meta.description}
      relatedLinks={relatedLinks}
      heroTitle={meta.h1}
      heroSubtitle={meta.description}
      heroImage={getHeroForService(parsed.service.slug, parsed.service.categorySlug)}
      galleryImages={galleryImages}
      categorySlug={parsed.service.categorySlug}
      showInternalLinkGrid
      exploreMoreCards={exploreMoreCards}
      seoLinkHubs={seoLinkHubs}
      locationLabel={locationLabel}
      nearbyLinks={nearbyLinks}
    />
  );
}
