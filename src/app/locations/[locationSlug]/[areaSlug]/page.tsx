import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { areaPath, areaServicePath } from "@/config/routes";
import { getImagesForService, getHeroForService } from "@/config/finalized-images";
import { getLocationBySlug } from "@/data/initial-locations";
import { getAreaBySlug, getAreaById } from "@/data/initial-areas";
import { getPublishedServices } from "@/data/initial-services";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { assembleAreaPageContent } from "@/lib/content/assemble-page-content";
import { generateInternalLinks } from "@/lib/internal-links/generate-internal-links";
import { generateExploreMoreFromPage } from "@/lib/internal-links/generate-explore-more";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContentSections } from "@/components/sections/ContentSections";
import { ImageGallery } from "@/components/sections/ImageGallery";
import { RelatedServicesImageGrid } from "@/components/sections/RelatedServicesImageGrid";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { CTABanner } from "@/components/sections/CTABanner";
import { ProgrammaticPageExtras } from "@/components/sections/ProgrammaticPageExtras";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb";
import { buildWebPageSchema } from "@/lib/schema/web-page";
import { absoluteUrl, buildAreaBreadcrumbs } from "@/lib/pages/page-helpers";

export const revalidate = 86400;
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ locationSlug: string; areaSlug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locationSlug, areaSlug } = await params;
  const page = getPublishedPageByPath(areaPath(locationSlug, areaSlug));
  if (!page) return {};
  return generatePageMetadata(page);
}

export function generateStaticParams() {
  return [];
}

export default async function AreaPage({ params }: PageProps) {
  const { locationSlug, areaSlug } = await params;
  const location = getLocationBySlug(locationSlug);
  const area = location ? getAreaBySlug(location.id, areaSlug) : undefined;

  if (!location || !area || area.publicationStatus !== "published" || !area.isServed) {
    notFound();
  }

  const page = getPublishedPageByPath(areaPath(locationSlug, areaSlug));
  if (!page) notFound();

  const services = getPublishedServices();
  const content = assembleAreaPageContent(area, location);
  const relatedLinks = generateInternalLinks(page);
  const breadcrumbs = buildAreaBreadcrumbs(location, area);
  const pageUrl = absoluteUrl(areaPath(locationSlug, areaSlug));
  const areaSeed = area.slug.split("").reduce((h, c) => h + c.charCodeAt(0), 0);
  const areaGallery = getImagesForService("safety-nets", "safety-nets", areaSeed, 12, {
    locationName: `${area.name}, ${location.name}`,
  });
  const areaHero = getHeroForService("invisible-grills", "invisible-grills", areaSeed);
  const nearbyAreas = area.nearbyAreaIds
    .map((id) => getAreaById(id))
    .filter(Boolean)
    .slice(0, 8);

  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema({ name: page.title, description: page.metaDescription, url: pageUrl }),
          buildBreadcrumbSchema(breadcrumbs),
        ]}
      />
      <Hero
        title={`Safety Installations in ${area.name}, ${location.name}`}
        subtitle={area.introduction}
        image={areaHero}
        imageAlt={`Invisible grills and safety nets in ${area.name}, ${location.name}`}
        fullBleed
        primaryCta={{ label: "Get Free Assessment", href: "/contact/" }}
        secondaryCta={{ label: "View Services", href: "/services/" }}
      />
      <Section>
        <Breadcrumbs items={breadcrumbs} />
      </Section>

      <ContentSections content={content} galleryImages={areaGallery} />

      <ImageGallery
        images={areaGallery}
        title={`Real HD projects near ${area.name}`}
        variant="muted"
      />

      <Section>
        <Heading level={2} className="text-primary mb-6">
          Services in {area.name}
        </Heading>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.id}>
              <Link
                href={areaServicePath(location.slug, area.slug, service.slug)}
                className="block rounded-md border border-border bg-white px-4 py-3 text-sm font-medium text-primary hover:border-accent transition-colors"
              >
                {service.shortName} in {area.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {nearbyAreas.length > 0 && (
        <Section variant="muted">
          <Heading level={2} className="text-primary mb-6">
            Nearby Localities
          </Heading>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {nearbyAreas.map((nearby) => (
              <li key={nearby!.id}>
                <Link
                  href={areaPath(location.slug, nearby!.slug)}
                  className="block rounded-md border border-border bg-white px-4 py-3 text-sm font-medium hover:border-primary transition-colors"
                >
                  {nearby!.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <ProgrammaticPageExtras />

      <RelatedServicesImageGrid
        links={relatedLinks}
        title={`Related services in ${area.name}`}
        description={`Browse ${area.name} service pages with real HD installation photos — invisible grills, safety nets, pigeon nets and more.`}
      />

      <Section variant="muted">
        <div className="max-w-2xl">
          <RelatedLinks links={relatedLinks} title="Related Pages & Services" />
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
