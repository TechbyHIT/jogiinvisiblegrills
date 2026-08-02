import type { Metadata } from "next";
import { BUSINESS_CONFIG } from "@/config/business";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const page = getPublishedPageByPath("/disclaimer/");
  return page ? generatePageMetadata(page) : { title: "Disclaimer" };
}

export default function DisclaimerPage() {
  return (
    <>
      <Hero title="Disclaimer" />
      <Section>
        <div className="max-w-3xl space-y-4 text-text-muted">
          <p>The information on this website is provided for general guidance about home safety installations. While we strive for accuracy, content may not reflect every site condition or building requirement.</p>
          <p>{BUSINESS_CONFIG.pricingStatement}</p>
          <p>Final specifications, safety spacing and installation methods are confirmed after on-site assessment. {BUSINESS_CONFIG.name} is not liable for decisions made solely based on website content without professional inspection.</p>
        </div>
      </Section>
    </>
  );
}
