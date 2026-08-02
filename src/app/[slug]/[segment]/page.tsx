import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cityServicePath } from "@/config/routes";
import { getLocationBySlug, getPublishedLocations } from "@/data/initial-locations";
import { getServiceBySlug, getPublishedServices } from "@/data/initial-services";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { assembleCityServicePageContent } from "@/lib/content/assemble-page-content";
import { generateInternalLinks } from "@/lib/internal-links/generate-internal-links";
import { ServiceDetailLayout } from "@/components/pages/ServiceDetailLayout";
import { absoluteUrl, buildCityServiceBreadcrumbs } from "@/lib/pages/page-helpers";
import { parseProgrammaticSlug, RESERVED_SLUGS } from "@/lib/routing/parse-programmatic-slug";
import { getHeroForService, getImagesForService } from "@/config/finalized-images";

export const revalidate = 86400;
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ slug: string; segment: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: locationSlug, segment: serviceSlug } = await params;
  const page = getPublishedPageByPath(cityServicePath(locationSlug, serviceSlug));
  if (!page) return {};
  return generatePageMetadata(page);
}

export function generateStaticParams() {
  const locations = getPublishedLocations();
  const services = getPublishedServices();

  return locations.flatMap((location) =>
    services.map((service) => ({
      slug: location.slug,
      segment: service.slug,
    })),
  );
}

export default async function CityServicePage({ params }: PageProps) {
  const { slug: locationSlug, segment: serviceSlug } = await params;

  if (RESERVED_SLUGS.has(locationSlug) || parseProgrammaticSlug(locationSlug)) {
    notFound();
  }

  const location = getLocationBySlug(locationSlug);
  const service = getServiceBySlug(serviceSlug);

  if (
    !location ||
    !service ||
    location.publicationStatus !== "published" ||
    !location.isServed ||
    service.publicationStatus !== "published"
  ) {
    notFound();
  }

  const page = getPublishedPageByPath(cityServicePath(locationSlug, serviceSlug));
  if (!page) notFound();

  const content = assembleCityServicePageContent(service, location);
  const breadcrumbs = buildCityServiceBreadcrumbs(location, service);
  const pageUrl = absoluteUrl(cityServicePath(locationSlug, serviceSlug));
  const seed = `${locationSlug}-${serviceSlug}`.split("").reduce((h, c) => h + c.charCodeAt(0), 0);
  const galleryImages = getImagesForService(service.slug, service.slug, seed, 24, {
    serviceName: service.name,
    locationName: location.name,
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
      heroTitle={`${service.name} in ${location.name}`}
      heroSubtitle={`${service.summary} Serving ${location.name}, ${location.state}.`}
      heroImage={getHeroForService(service.slug, service.slug, seed)}
      galleryImages={galleryImages}
      locationLabel={`${location.name}, ${location.state}`}
    />
  );
}
