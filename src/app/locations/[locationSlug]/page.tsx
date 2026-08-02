import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { locationPath, cityServicePath } from "@/config/routes";
import { getLocationBySlug, getPublishedLocations } from "@/data/initial-locations";
import { getAreasByLocationId } from "@/data/initial-areas";
import { getPublishedServices } from "@/data/initial-services";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { assembleLocationPageContent } from "@/lib/content/assemble-page-content";
import { generateInternalLinks } from "@/lib/internal-links/generate-internal-links";
import { generateExploreMoreFromPage } from "@/lib/internal-links/generate-explore-more";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContentSections } from "@/components/sections/ContentSections";
import { CityAreaGrid } from "@/components/sections/CityAreaGrid";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb";
import { buildWebPageSchema } from "@/lib/schema/web-page";
import { absoluteUrl, buildLocationBreadcrumbs } from "@/lib/pages/page-helpers";

export const revalidate = 86400;
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ locationSlug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locationSlug } = await params;
  const page = getPublishedPageByPath(locationPath(locationSlug));
  if (!page) return {};
  return generatePageMetadata(page);
}

export function generateStaticParams() {
  return getPublishedLocations().map((location) => ({
    locationSlug: location.slug,
  }));
}

export default async function LocationPage({ params }: PageProps) {
  const { locationSlug } = await params;
  const location = getLocationBySlug(locationSlug);

  if (!location || location.publicationStatus !== "published" || !location.isServed) {
    notFound();
  }

  const page = getPublishedPageByPath(locationPath(locationSlug));
  if (!page) notFound();

  const areas = getAreasByLocationId(location.id).filter((a) => a.isServed);
  const services = getPublishedServices();
  const content = assembleLocationPageContent(location);
  const relatedLinks = generateInternalLinks(page);
  const exploreCards = generateExploreMoreFromPage(page);
  const breadcrumbs = buildLocationBreadcrumbs(location);
  const pageUrl = absoluteUrl(locationPath(locationSlug));

  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema({ name: page.title, description: page.metaDescription, url: pageUrl }),
          buildBreadcrumbSchema(breadcrumbs),
        ]}
      />
      <Hero
        title={`Safety Installations in ${location.name}`}
        subtitle={location.introduction}
      />
      <Section>
        <Breadcrumbs items={breadcrumbs} />
      </Section>

      <ContentSections content={content} />

      <Section variant="muted">
        <Heading level={2} className="text-primary mb-6">
          Services in {location.name}
        </Heading>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.id}>
              <Link
                href={cityServicePath(location.slug, service.slug)}
                className="block rounded-md border border-border bg-white px-4 py-3 text-sm font-medium text-primary hover:border-accent hover:text-accent transition-colors"
              >
                {service.shortName} in {location.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      {areas.length > 0 && (
        <Section>
          <CityAreaGrid location={location} areas={areas} showCityHubLink={false} />
        </Section>
      )}
      <RelatedLinks
        cards={exploreCards}
        links={relatedLinks}
        title="Explore more in Karnataka"
      />
      <CTABanner />
    </>
  );
}
