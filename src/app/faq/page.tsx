import type { Metadata } from "next";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { getSiteFaqs } from "@/data/faqs";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CorePageContent } from "@/components/sections/CorePageContent";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildFaqSchema } from "@/lib/schema/faq";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const page = getPublishedPageByPath("/faq/");
  return page ? generatePageMetadata(page) : { title: "FAQ" };
}

export default function FaqPage() {
  const faqs = getSiteFaqs().map((f) => ({ question: f.question, answer: f.answer }));

  return (
    <>
      <JsonLd data={buildFaqSchema(faqs)} />
      <Hero title="Frequently Asked Questions" subtitle="Answers to common questions about our services and process." />
      <CorePageContent path="/faq/" />
      <Section variant="muted">
        <div className="max-w-3xl mx-auto">
          <FAQAccordion items={faqs} />
        </div>
      </Section>
      <CTABanner />
    </>
  );
}
