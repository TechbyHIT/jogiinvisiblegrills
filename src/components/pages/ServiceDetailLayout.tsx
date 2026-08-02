import type { ReactNode } from "react";
import type { ServiceRecord } from "@/types";
import type { AssembledPageContent } from "@/lib/content/assemble-page-content";
import type { BreadcrumbItem, InternalLink } from "@/types";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContentSections } from "@/components/sections/ContentSections";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CTABanner } from "@/components/sections/CTABanner";
import { InstallationGallery } from "@/components/sections/InstallationGallery";
import type { ExploreMoreCard } from "@/lib/internal-links/explore-more-types";
import type { SeoLinkHub } from "@/lib/internal-links/seo-link-hubs";
import { ExploreMoreSection } from "@/components/sections/explore-more/ExploreMoreSection";
import { ProgrammaticPageExtras } from "@/components/sections/ProgrammaticPageExtras";
import { TestimonialsStrip } from "@/components/sections/TestimonialsStrip";
import { ContactQuoteSection } from "@/components/sections/ContactQuoteSection";
import { RelatedServicesImageGrid } from "@/components/sections/RelatedServicesImageGrid";
import { ServiceFeaturedImage } from "@/components/sections/ServiceFeaturedImage";
import { ServiceLocalitySidebar } from "@/components/sections/ServiceLocalitySidebar";
import { ServiceApplicationsGrid } from "@/components/sections/ServiceApplicationsGrid";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Heading } from "@/components/ui/Heading";
import { Container } from "@/components/ui/Container";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb";
import { buildServiceSchema } from "@/lib/schema/service";
import { buildFaqSchema } from "@/lib/schema/faq";
import { buildWebPageSchema } from "@/lib/schema/web-page";
import { serviceFaqsFromContent } from "@/lib/pages/page-helpers";
import { BUSINESS_CONFIG } from "@/config/business";

type ServiceDetailLayoutProps = {
  service: ServiceRecord;
  content: AssembledPageContent;
  breadcrumbs: BreadcrumbItem[];
  pageUrl: string;
  pageTitle: string;
  pageDescription: string;
  relatedLinks: InternalLink[];
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  galleryImages?: Array<{ src: string; alt: string }>;
  categorySlug?: string;
  showInternalLinkGrid?: boolean;
  exploreMoreCards?: ExploreMoreCard[];
  seoLinkHubs?: SeoLinkHub[];
  locationLabel?: string;
  nearbyLinks?: InternalLink[];
  layout?: "featherguard" | "hero";
  sidebar?: ReactNode;
};

function buildApplicationItems(service: ServiceRecord): string[] {
  const fromService = [
    ...service.applications,
    ...service.features.slice(0, 4),
    ...service.benefits.slice(0, 2),
  ];
  const unique = [...new Set(fromService.map((s) => s.trim()).filter(Boolean))];
  return unique.slice(0, 12);
}

export function ServiceDetailLayout({
  service,
  content,
  breadcrumbs,
  pageUrl,
  pageTitle,
  pageDescription,
  heroSubtitle,
  heroImage,
  galleryImages = [],
  categorySlug,
  exploreMoreCards = [],
  seoLinkHubs = [],
  relatedLinks = [],
  locationLabel = "Bengaluru & Mysuru",
  nearbyLinks = [],
}: ServiceDetailLayoutProps) {
  const faqs = serviceFaqsFromContent(service);
  const applications = buildApplicationItems(service);
  const applicationsTitle = `${service.shortName} Applications in ${locationLabel}`;

  const introParagraphs = [content.intro, heroSubtitle].filter(
    (p, i, arr) => Boolean(p) && arr.indexOf(p) === i,
  ) as string[];

  const sidebarNearby =
    nearbyLinks.length > 0
      ? nearbyLinks
      : (seoLinkHubs.find((h) => h.id === "top-localities")?.links ?? relatedLinks).slice(0, 14);

  const featuredImage = heroImage
    ? { src: heroImage, alt: `${service.shortName} installation in ${locationLabel}` }
    : galleryImages[0];
  const gridImages = heroImage ? galleryImages.slice(0, 6) : galleryImages.slice(1, 7);
  const contentGalleryImages = galleryImages.slice(heroImage ? 6 : 7);

  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema({ name: pageTitle, description: pageDescription, url: pageUrl }),
          buildServiceSchema(service, pageUrl),
          buildBreadcrumbSchema(breadcrumbs),
          buildFaqSchema(faqs),
        ]}
      />

      <Section className="!py-4 border-b border-border bg-surface">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      </Section>

      <Section className="!pt-8 !pb-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            {/* Main column — Featherguard-style */}
            <div className="lg:col-span-2 min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-[2rem] font-bold text-primary leading-tight tracking-tight">
                Professional {service.shortName} Installation in {locationLabel}
              </h1>

              <div className="mt-6 space-y-4 text-text-muted leading-relaxed prose-section">
                {introParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                {introParagraphs.length === 0 && (
                  <p>
                    {BUSINESS_CONFIG.name} provides professional {service.shortName.toLowerCase()}{" "}
                    installation in {locationLabel}. Free site inspection, premium materials and
                    clean finishing for apartments, villas and commercial buildings across Karnataka.
                  </p>
                )}
              </div>

              {featuredImage && (
                <ServiceFeaturedImage
                  src={featuredImage.src}
                  alt={featuredImage.alt}
                  locationLabel={locationLabel}
                  serviceName={service.shortName}
                />
              )}

              <ServiceApplicationsGrid title={applicationsTitle} items={applications} />

              {gridImages.length > 0 && (
                <InstallationGallery
                  images={gridImages}
                  maxImages={6}
                  layout="inline"
                  title="Recent installation photos"
                  subtitle={`Real ${service.shortName.toLowerCase()} projects by ${BUSINESS_CONFIG.name} in ${locationLabel}.`}
                />
              )}

              <div className="mt-10">
                <ContentSections
                  content={{ ...content, intro: "" }}
                  galleryImages={contentGalleryImages.length > 0 ? contentGalleryImages : galleryImages}
                  embedded
                />
              </div>

              <Section className="!px-0 !py-8" id="faq">
                <SectionEyebrow>FAQ</SectionEyebrow>
                <Heading level={2} className="text-primary mb-6 text-xl">
                  Frequently asked questions
                </Heading>
                <FAQAccordion items={faqs} />
              </Section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ServiceLocalitySidebar
                serviceName={service.shortName}
                serviceSlug={service.slug}
                locationLabel={locationLabel}
                nearbyLinks={sidebarNearby}
              />
            </div>
          </div>
        </Container>
      </Section>

      <ProgrammaticPageExtras categorySlug={categorySlug} serviceName={service.name} />

      {relatedLinks.length > 0 && (
        <RelatedServicesImageGrid
          links={relatedLinks}
          title={`Related ${service.shortName} pages`}
          description="Explore nearby localities, keyword searches and sibling services with real project photos."
        />
      )}

      {exploreMoreCards.length > 0 && (
        <ExploreMoreSection
          cards={exploreMoreCards}
          title="Explore more"
          description="Grouped navigation across services, neighbourhoods, pricing, guides and booking — unique to this page."
        />
      )}

      <TestimonialsStrip serviceSlug={service.slug} />

      <ContactQuoteSection defaultServiceSlug={service.slug} />

      <CTABanner
        title="Get a Free Site Inspection Today"
        primaryLabel="Get Free Site Inspection"
      />
    </>
  );
}
