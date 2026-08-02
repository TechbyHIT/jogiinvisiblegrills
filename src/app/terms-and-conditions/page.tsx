import type { Metadata } from "next";
import { BUSINESS_CONFIG } from "@/config/business";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const page = getPublishedPageByPath("/terms-and-conditions/");
  return page ? generatePageMetadata(page) : { title: "Terms and Conditions" };
}

export default function TermsPage() {
  return (
    <>
      <Hero title="Terms and Conditions" />
      <Section>
        <div className="max-w-3xl space-y-4 text-text-muted">
          <p>By using the {BUSINESS_CONFIG.name} website and services, you agree to these terms.</p>
          <h2 className="font-display text-xl font-semibold text-primary">Services</h2>
          <p>We provide home safety installation services including invisible grills, safety nets and related products. Quotations are based on site measurements and agreed specifications.</p>
          <h2 className="font-display text-xl font-semibold text-primary">Quotations &amp; Payment</h2>
          <p>Pricing depends on measurements, materials, complexity and quantity. Payment terms are agreed before work begins.</p>
          <h2 className="font-display text-xl font-semibold text-primary">Limitation</h2>
          <p>Safety installations reduce risk but do not replace adult supervision. Maintenance and periodic inspection are recommended.</p>
        </div>
      </Section>
    </>
  );
}
