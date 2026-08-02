import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { solutionPath, servicePath } from "@/config/routes";
import { getProblemBySlug, getPublishedProblems } from "@/data/problems";
import { getServiceById } from "@/data/initial-services";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { assembleSolutionPageContent } from "@/lib/content/assemble-page-content";
import { generateInternalLinks } from "@/lib/internal-links/generate-internal-links";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContentSections } from "@/components/sections/ContentSections";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb";
import { buildWebPageSchema } from "@/lib/schema/web-page";
import { buildFaqSchema } from "@/lib/schema/faq";
import { absoluteUrl } from "@/lib/pages/page-helpers";
import { BUSINESS_CONFIG } from "@/config/business";

export const revalidate = 86400;
export const dynamicParams = true;

type PageProps = { params: Promise<{ problemSlug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { problemSlug } = await params;
  const page = getPublishedPageByPath(solutionPath(problemSlug));
  if (!page) return {};
  return generatePageMetadata(page);
}

export function generateStaticParams() {
  return getPublishedProblems().map((p) => ({ problemSlug: p.slug }));
}

export default async function SolutionPage({ params }: PageProps) {
  const { problemSlug } = await params;
  const problem = getProblemBySlug(problemSlug);
  if (!problem || problem.publicationStatus !== "published") notFound();

  const page = getPublishedPageByPath(solutionPath(problemSlug));
  if (!page) notFound();

  const content = assembleSolutionPageContent(problem);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "/solutions/" },
    { name: problem.name, href: solutionPath(problem.slug) },
  ];
  const pageUrl = absoluteUrl(solutionPath(problem.slug));
  const faqs = problem.customerQuestions.map((q) => ({
    question: q,
    answer: BUSINESS_CONFIG.pricingStatement,
  }));
  const relatedServices = problem.relatedServiceIds
    .map((id) => getServiceById(id))
    .filter(Boolean);

  return (
    <>
      <JsonLd data={[buildWebPageSchema({ name: page.title, description: page.metaDescription, url: pageUrl }), buildBreadcrumbSchema(breadcrumbs), buildFaqSchema(faqs)]} />
      <Hero title={problem.name} subtitle={problem.summary} />
      <Section>
        <Breadcrumbs items={breadcrumbs} />
      </Section>
      <ContentSections content={content} />
      <Section>
        <h2 className="font-display text-xl font-semibold text-primary mb-4">Recommended Services</h2>
        <ul className="grid gap-3 sm:grid-cols-2 max-w-3xl">
          {relatedServices.map((service) => service && (
            <li key={service.id}>
              <Link href={servicePath(service.slug)} className="text-primary hover:text-accent font-medium">{service.name}</Link>
            </li>
          ))}
        </ul>
      </Section>
      <Section variant="muted">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold text-primary mb-6">Common Questions</h2>
            <FAQAccordion items={faqs} />
          </div>
          <RelatedLinks links={generateInternalLinks(page)} />
        </div>
      </Section>
      <CTABanner />
    </>
  );
}
