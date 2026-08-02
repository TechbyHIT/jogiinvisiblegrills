import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicePath } from "@/config/routes";
import { getServiceBySlug, getPublishedServices } from "@/data/initial-services";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { assembleServicePageContent } from "@/lib/content/assemble-page-content";
import { generateInternalLinks } from "@/lib/internal-links/generate-internal-links";
import { ServiceDetailLayout } from "@/components/pages/ServiceDetailLayout";
import { absoluteUrl, buildServiceBreadcrumbs } from "@/lib/pages/page-helpers";
import { getHeroForService, getImagesForService } from "@/config/finalized-images";

export const revalidate = 86400;
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ serviceSlug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const page = getPublishedPageByPath(servicePath(serviceSlug));
  if (!page) return {};
  return generatePageMetadata(page);
}

export function generateStaticParams() {
  return getPublishedServices().map((service) => ({
    serviceSlug: service.slug,
  }));
}

export default async function ServicePage({ params }: PageProps) {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service || service.publicationStatus !== "published") {
    notFound();
  }

  const page = getPublishedPageByPath(servicePath(serviceSlug));
  if (!page) notFound();

  const content = assembleServicePageContent(service);
  const breadcrumbs = buildServiceBreadcrumbs(service);
  const pageUrl = absoluteUrl(servicePath(serviceSlug));
  const seed = service.slug.split("").reduce((h, c) => h + c.charCodeAt(0), 0);
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
      heroImage={getHeroForService(service.slug, service.slug, seed)}
      galleryImages={galleryImages}
      locationLabel="Bengaluru & Mysuru"
    />
  );
}
