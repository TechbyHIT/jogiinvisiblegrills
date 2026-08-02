import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { guidePath } from "@/config/routes";
import { getGuideBySlug, getPublishedGuides } from "@/data/guides";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { assembleGuidePageContent } from "@/lib/content/assemble-page-content";
import { generateInternalLinks } from "@/lib/internal-links/generate-internal-links";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContentSections } from "@/components/sections/ContentSections";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CTABanner } from "@/components/sections/CTABanner";
import { buildArticleSchema } from "@/lib/schema/article";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/pages/page-helpers";

export const revalidate = 86400;
export const dynamicParams = true;

type PageProps = { params: Promise<{ guideSlug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { guideSlug } = await params;
  const page = getPublishedPageByPath(guidePath(guideSlug));
  if (!page) return {};
  return generatePageMetadata(page);
}

export function generateStaticParams() {
  return getPublishedGuides().map((g) => ({ guideSlug: g.slug }));
}

export default async function GuidePage({ params }: PageProps) {
  const { guideSlug } = await params;
  const guide = getGuideBySlug(guideSlug);
  if (!guide || guide.publicationStatus !== "published") notFound();

  const page = getPublishedPageByPath(guidePath(guide.slug));
  if (!page) notFound();

  const content = assembleGuidePageContent(guide);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides/" },
    { name: guide.title, href: guidePath(guide.slug) },
  ];
  const pageUrl = absoluteUrl(guidePath(guide.slug));

  return (
    <>
      <JsonLd data={buildArticleSchema({ title: guide.title, description: guide.summary, url: pageUrl, datePublished: guide.reviewedAt, dateModified: guide.updatedAt })} />
      <Hero title={guide.title} subtitle={guide.summary} />
      <Section>
        <Breadcrumbs items={breadcrumbs} />
      </Section>
      <ContentSections content={content} />
      {guide.faqs.length > 0 && (
        <Section variant="muted">
          <h2 className="font-display text-2xl font-semibold text-primary mb-6">Frequently Asked Questions</h2>
          <div className="max-w-3xl">
            <FAQAccordion items={guide.faqs} />
          </div>
        </Section>
      )}
      <Section variant="muted">
        <div className="max-w-md">
          <RelatedLinks links={generateInternalLinks(page)} />
        </div>
      </Section>
      <CTABanner />
    </>
  );
}
