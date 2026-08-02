import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { areaServicePath } from "@/config/routes";
import { getLocationBySlug } from "@/data/initial-locations";
import { getAreaBySlug } from "@/data/initial-areas";
import { getServiceBySlug } from "@/data/initial-services";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { assembleAreaServicePageContent } from "@/lib/content/assemble-page-content";
import { generateInternalLinks } from "@/lib/internal-links/generate-internal-links";
import { ServiceDetailLayout } from "@/components/pages/ServiceDetailLayout";
import { absoluteUrl, buildAreaServiceBreadcrumbs } from "@/lib/pages/page-helpers";
import { RESERVED_SLUGS } from "@/lib/routing/parse-programmatic-slug";
import { getHeroForService, getImagesForService } from "@/config/finalized-images";

export const revalidate = 86400;
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ slug: string; segment: string; segment2: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: locationSlug, segment: areaSlug, segment2: serviceSlug } = await params;
  const page = getPublishedPageByPath(
    areaServicePath(locationSlug, areaSlug, serviceSlug),
  );
  if (!page) return {};
  return generatePageMetadata(page);
}

export function generateStaticParams() {
  return [];
}

export default async function AreaServicePage({ params }: PageProps) {
  const { slug: locationSlug, segment: areaSlug, segment2: serviceSlug } = await params;

  if (RESERVED_SLUGS.has(locationSlug)) {
    notFound();
  }

  const location = getLocationBySlug(locationSlug);
  const area = location ? getAreaBySlug(location.id, areaSlug) : undefined;
  const service = getServiceBySlug(serviceSlug);

  if (
    !location ||
    !area ||
    !service ||
    location.publicationStatus !== "published" ||
    !location.isServed ||
    area.publicationStatus !== "published" ||
    !area.isServed ||
    service.publicationStatus !== "published"
  ) {
    notFound();
  }

  const page = getPublishedPageByPath(
    areaServicePath(locationSlug, areaSlug, serviceSlug),
  );
  if (!page) notFound();

  const content = assembleAreaServicePageContent(service, location, area);
  const breadcrumbs = buildAreaServiceBreadcrumbs(location, area, service);
  const pageUrl = absoluteUrl(areaServicePath(locationSlug, areaSlug, serviceSlug));
  const seed = `${locationSlug}-${areaSlug}-${serviceSlug}`.split("").reduce((h, c) => h + c.charCodeAt(0), 0);
  const galleryImages = getImagesForService(service.slug, service.slug, seed, 24, {
    serviceName: service.name,
    locationName: area.name,
  });

  return (
    <ServiceDetailLayout
      service={service}
      content={content}
      breadcrumbs={breadcrumbs}
      pageUrl={pageUrl}
      pageTitle={page.title}
      pageDescription={page.metaDescription}
      relatedLinks={generateInternalLinks(page)}
      showInternalLinkGrid
      heroTitle={`${service.name} in ${area.name}`}
      heroSubtitle={`${service.summary} Serving ${area.name}, ${location.name}.`}
      heroImage={getHeroForService(service.slug, service.slug, seed)}
      galleryImages={galleryImages}
      locationLabel={`${area.name}, ${location.name}`}
      nearbyLinks={generateInternalLinks(page).slice(0, 14)}
    />
  );
}
