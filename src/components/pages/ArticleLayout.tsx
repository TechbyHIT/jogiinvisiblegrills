import type { ReactNode } from "react";
import type { BreadcrumbItem } from "@/types";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CTABanner } from "@/components/sections/CTABanner";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb";
import { buildWebPageSchema } from "@/lib/schema/web-page";
import { buildFaqSchema } from "@/lib/schema/faq";

type ArticleLayoutProps = {
  title: string;
  summary: string;
  content: string[];
  breadcrumbs: BreadcrumbItem[];
  pageUrl: string;
  pageTitle: string;
  pageDescription: string;
  faqs?: Array<{ question: string; answer: string }>;
  children?: ReactNode;
};

export function ArticleLayout({
  title,
  summary,
  content,
  breadcrumbs,
  pageUrl,
  pageTitle,
  pageDescription,
  faqs,
  children,
}: ArticleLayoutProps) {
  const schemas: Record<string, unknown>[] = [
    buildWebPageSchema({ name: pageTitle, description: pageDescription, url: pageUrl }),
    buildBreadcrumbSchema(breadcrumbs),
  ];
  if (faqs && faqs.length > 0) {
    schemas.push(buildFaqSchema(faqs));
  }

  return (
    <>
      <JsonLd data={schemas} />
      <Hero title={title} subtitle={summary} />
      <Section>
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-8 max-w-3xl space-y-4 text-text-muted">
          {content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        {children}
      </Section>
      {faqs && faqs.length > 0 && (
        <Section variant="muted">
          <h2 className="font-display text-2xl font-semibold text-primary mb-6">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl">
            <FAQAccordion items={faqs} />
          </div>
        </Section>
      )}
      <CTABanner />
    </>
  );
}
