import type { Metadata } from "next";
import { BUSINESS_CONFIG } from "@/config/business";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { CorePageContent } from "@/components/sections/CorePageContent";
import { CTABanner } from "@/components/sections/CTABanner";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const page = getPublishedPageByPath("/pricing-guide/");
  return page ? generatePageMetadata(page) : { title: "Pricing Guide" };
}

export default function PricingGuidePage() {
  return (
    <>
      <Hero title="Pricing Guide" subtitle="Understand how we calculate quotations for safety installations." />
      <Section>
        <div className="max-w-3xl space-y-6 text-text-muted">
          <p className="text-lg">{BUSINESS_CONFIG.pricingStatement}</p>
          <Heading level={2} className="text-primary">Factors That Affect Your Quote</Heading>
          <ul className="list-disc list-inside space-y-2">
            <li>Opening width, height and total running length</li>
            <li>Material grade (stainless steel cable, mesh type, bracket quality)</li>
            <li>Building height and access requirements</li>
            <li>Number of openings and total project quantity</li>
            <li>Custom spacing for child or pet safety needs</li>
            <li>Finishing and edge sealing requirements</li>
          </ul>
        </div>
      </Section>
      <CorePageContent path="/pricing-guide/" />
      <CTABanner primaryLabel="Request a Quote" />
    </>
  );
}
