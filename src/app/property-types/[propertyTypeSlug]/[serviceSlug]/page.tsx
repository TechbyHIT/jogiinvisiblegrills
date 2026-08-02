import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { propertyTypeServicePath } from "@/config/routes";
import { getPropertyTypeBySlug } from "@/data/property-types";
import { getServiceBySlug } from "@/data/initial-services";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { assemblePropertyTypeServicePageContent } from "@/lib/content/assemble-page-content";
import { generateInternalLinks } from "@/lib/internal-links/generate-internal-links";
import { ServiceDetailLayout } from "@/components/pages/ServiceDetailLayout";
import { absoluteUrl } from "@/lib/pages/page-helpers";
import { getHeroForService, getImagesForService } from "@/config/finalized-images";

export const revalidate = 86400;
export const dynamicParams = true;

type PageProps = { params: Promise<{ propertyTypeSlug: string; serviceSlug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { propertyTypeSlug, serviceSlug } = await params;
  const page = getPublishedPageByPath(propertyTypeServicePath(propertyTypeSlug, serviceSlug));
  if (!page) return {};
  return generatePageMetadata(page);
}

export function generateStaticParams() {
  return [];
}

export default async function PropertyTypeServicePage({ params }: PageProps) {
  const { propertyTypeSlug, serviceSlug } = await params;
  const propertyType = getPropertyTypeBySlug(propertyTypeSlug);
  const service = getServiceBySlug(serviceSlug);

  if (!propertyType || !service || !propertyType.suitableServiceIds.includes(service.id)) {
    notFound();
  }

  const page = getPublishedPageByPath(propertyTypeServicePath(propertyTypeSlug, serviceSlug));
  if (!page) notFound();

  const content = assemblePropertyTypeServicePageContent(propertyType, service);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Property Types", href: "/property-types/" },
    { name: propertyType.name, href: "/property-types/" },
    { name: `${service.shortName} for ${propertyType.name}`, href: propertyTypeServicePath(propertyTypeSlug, serviceSlug) },
  ];
  const pageUrl = absoluteUrl(propertyTypeServicePath(propertyTypeSlug, serviceSlug));
  const seed = `${propertyTypeSlug}-${serviceSlug}`.split("").reduce((h, c) => h + c.charCodeAt(0), 0);
  const galleryImages = getImagesForService(service.slug, service.slug, seed, 24, {
    serviceName: service.name,
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
      heroTitle={`${service.name} for ${propertyType.name}`}
      heroSubtitle={propertyType.summary}
      heroImage={getHeroForService(service.slug, service.slug, seed)}
      galleryImages={galleryImages}
      locationLabel="Bengaluru & Mysuru"
    />
  );
}
