import type { Metadata } from "next";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { getPublishedServices } from "@/data/initial-services";
import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { ServiceShowcaseSection } from "@/components/sections/ServiceShowcaseSection";
import { NetTypesSection } from "@/components/sections/NetTypesSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RequirementCards } from "@/components/sections/RequirementCards";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Heading } from "@/components/ui/Heading";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { TestimonialsStrip } from "@/components/sections/TestimonialsStrip";
import { ContactQuoteSection } from "@/components/sections/ContactQuoteSection";
import { CorePageContent } from "@/components/sections/CorePageContent";
import { CTABanner } from "@/components/sections/CTABanner";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const page = getPublishedPageByPath("/services/");
  return page ? generatePageMetadata(page) : { title: "Our Services" };
}

export default function ServicesPage() {
  const services = getPublishedServices();

  return (
    <>
      <Hero
        title="Our Safety Services"
        subtitle="Professional installation of invisible grills, safety nets, pigeon nets, mosquito nets, cloth hangers and sports nets across Bengaluru & Mysuru."
        showWhatsApp
        showCall
        primaryCta={{ label: "Get Free Site Inspection", href: "/contact/" }}
      />

      <StatsBar />

      <ServiceShowcaseSection />

      <NetTypesSection />

      <HowItWorks />

      <Section id="all-services">
        <SectionEyebrow>Full Catalogue</SectionEyebrow>
        <Heading level={2} className="text-primary mb-2">
          All services
        </Heading>
        <p className="mb-8 max-w-2xl text-text-muted">
          Browse every safety and protection service we install — each page includes materials,
          process guidance and locality coverage.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Section>

      <RequirementCards />

      <TestimonialsStrip />

      <ContactQuoteSection />

      <CorePageContent path="/services/" />

      <CTABanner />
    </>
  );
}
