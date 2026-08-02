import type { Metadata } from "next";
import { BUSINESS_CONFIG } from "@/config/business";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhyChooseGrid } from "@/components/sections/WhyChooseGrid";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TestimonialsStrip } from "@/components/sections/TestimonialsStrip";
import { ContactQuoteSection } from "@/components/sections/ContactQuoteSection";
import { CorePageContent } from "@/components/sections/CorePageContent";
import { CTABanner } from "@/components/sections/CTABanner";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const page = getPublishedPageByPath("/about/");
  return page ? generatePageMetadata(page) : { title: "About Us" };
}

export default function AboutPage() {
  return (
    <>
      <Hero
        title={`About ${BUSINESS_CONFIG.name}`}
        subtitle={`Led by ${BUSINESS_CONFIG.ownerName}, we provide trusted invisible grills, safety nets and home protection across Bengaluru, Mysuru and Karnataka.`}
        showWhatsApp
        showCall
        primaryCta={{ label: "Get Free Site Inspection", href: "/contact/" }}
      />

      <StatsBar />

      <AboutSection />

      <WhyChooseGrid title={`Why families trust ${BUSINESS_CONFIG.name}`} />

      <HowItWorks />

      <TestimonialsStrip />

      <CorePageContent path="/about/" />

      <ContactQuoteSection />

      <CTABanner />
    </>
  );
}
