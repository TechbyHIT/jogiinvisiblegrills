import { BUSINESS_CONFIG } from "@/config/business";
import { BENGALURU_LOCALITY_LINE, HOME_FAQS } from "@/config/home-content";
import { getHomeServicesGalleryImages, getHomeHeroImage } from "@/config/finalized-images";
import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { ContactQuoteSection } from "@/components/sections/ContactQuoteSection";
import { ServiceQuickLinksSection } from "@/components/sections/ServiceQuickLinksSection";
import { ServiceShowcaseSection } from "@/components/sections/ServiceShowcaseSection";
import { NetTypesSection } from "@/components/sections/NetTypesSection";
import { BrandsStrip } from "@/components/sections/BrandsStrip";
import { AboutSection } from "@/components/sections/AboutSection";
import { InstallationGallery } from "@/components/sections/InstallationGallery";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TestimonialsStrip } from "@/components/sections/TestimonialsStrip";
import { WhyChooseGrid } from "@/components/sections/WhyChooseGrid";
import { RequirementCards } from "@/components/sections/RequirementCards";
import { CategoryServicesSection } from "@/components/sections/CategoryServicesSection";
import { FeaturedProductsSection } from "@/components/sections/FeaturedProductsSection";
import { AreasServeSection } from "@/components/sections/AreasServeSection";
import { HomeSeoGuideSection } from "@/components/sections/HomeSeoGuideSection";
import { CorePageContent } from "@/components/sections/CorePageContent";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CTABanner } from "@/components/sections/CTABanner";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Heading } from "@/components/ui/Heading";

export default function HomePage() {
  const homeGallery = getHomeServicesGalleryImages(3);
  const heroImage = getHomeHeroImage();

  return (
    <>
      <Hero
        title={`${BUSINESS_CONFIG.name} – Premium Invisible Grills & Safety Nets Solutions`}
        badge="#1 for Invisible Grills & Safety Nets in Bengaluru & Mysuru"
        subtitle="Professional installation of invisible grills, safety nets, balcony nets, pigeon nets, bird nets, anti-bird nets, bird spikes, cloth hangers and sports nets for homes, apartments, balconies, windows, terraces, villas and commercial buildings across Bengaluru & Mysuru."
        localityLine={BENGALURU_LOCALITY_LINE}
        image={heroImage}
        imageAlt={`Premium invisible grill installation by ${BUSINESS_CONFIG.name}`}
        fullBleed
        showDefaultTrustPills
        showWhatsApp
        showCall
        primaryCta={{ label: "Get Free Site Inspection", href: "/contact/" }}
      />

      <ContactQuoteSection />

      <StatsBar />

      <ServiceQuickLinksSection />

      <ServiceShowcaseSection />

      <NetTypesSection />

      <BrandsStrip />

      <InstallationGallery
        images={homeGallery}
        maxImages={24}
        title="Happy customers & recent projects"
        subtitle="Real HD installation photos from every service — invisible grills, safety nets, pigeon nets, bird nets, mosquito nets, sports nets, cloth hangers and bird spikes across Bengaluru & Mysuru."
      />

      <HowItWorks />

      <TestimonialsStrip />

      <WhyChooseGrid title={`Why choose ${BUSINESS_CONFIG.name}?`} />

      <RequirementCards />

      <AboutSection />

      <FeaturedProductsSection />

      <CategoryServicesSection />

      <AreasServeSection />

      <HomeSeoGuideSection />

      <CorePageContent path="/" />

      <Section id="faq">
        <SectionEyebrow>FAQ</SectionEyebrow>
        <Heading level={2} className="text-primary mb-2">
          Frequently asked questions
        </Heading>
        <p className="mb-8 max-w-2xl text-sm text-text-muted">
          Common questions about safety nets and invisible grill installation in Bengaluru &amp;
          Mysuru.
        </p>
        <div className="max-w-3xl">
          <FAQAccordion items={[...HOME_FAQS]} />
        </div>
      </Section>

      <ContactQuoteSection />

      <CTABanner
        title="Get a Free Site Inspection Today"
        description={`Call ${BUSINESS_CONFIG.phone.display} or WhatsApp us for premium invisible grills and safety nets in Bengaluru & Mysuru.`}
        primaryLabel="Get Free Site Inspection"
      />
    </>
  );
}
