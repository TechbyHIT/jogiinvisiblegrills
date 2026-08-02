import type { Metadata } from "next";
import { BUSINESS_CONFIG } from "@/config/business";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const page = getPublishedPageByPath("/privacy-policy/");
  return page ? generatePageMetadata(page) : { title: "Privacy Policy" };
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Hero title="Privacy Policy" />
      <Section>
        <div className="max-w-3xl space-y-4 text-text-muted prose-section">
          <p>This Privacy Policy describes how {BUSINESS_CONFIG.legalName} collects, uses and protects your personal information when you visit our website or submit an enquiry.</p>
          <h2 className="font-display text-xl font-semibold text-primary">Information We Collect</h2>
          <p>When you contact us, we may collect your name, phone number, email address, locality and details about your safety installation requirement.</p>
          <h2 className="font-display text-xl font-semibold text-primary">How We Use Information</h2>
          <p>We use your information to respond to enquiries, provide quotations, schedule site visits and deliver our services. We do not sell your personal data to third parties.</p>
          <h2 className="font-display text-xl font-semibold text-primary">Contact</h2>
          <p>For privacy-related questions, contact us at {BUSINESS_CONFIG.email} or {BUSINESS_CONFIG.phone.display}.</p>
        </div>
      </Section>
    </>
  );
}
