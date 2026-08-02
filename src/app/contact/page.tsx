import type { Metadata } from "next";
import {
  BUSINESS_CONFIG,
  formatBusinessAddress,
  getGoogleMapsUrl,
  getPhoneUrl,
  getWhatsAppUrl,
  isConfiguredContactValue,
} from "@/config/business";
import { HOME_FAQS } from "@/config/home-content";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { getHomeHeroImage } from "@/config/finalized-images";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Heading } from "@/components/ui/Heading";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhyChooseGrid } from "@/components/sections/WhyChooseGrid";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { BusinessQuickLinks } from "@/components/sections/BusinessQuickLinks";
import { CorePageContent } from "@/components/sections/CorePageContent";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const page = getPublishedPageByPath("/contact/");
  return page ? generatePageMetadata(page) : { title: "Contact Us" };
}

export default function ContactPage() {
  const { phone, whatsapp, email, ownerName } = BUSINESS_CONFIG;
  const addressLine = formatBusinessAddress();

  return (
    <>
      <Hero
        title={`Contact ${BUSINESS_CONFIG.name}`}
        subtitle={`Speak with ${ownerName} or our team for invisible grills, safety nets and home protection in Bengaluru & Mysuru. Call or WhatsApp for a free site inspection.`}
        image={getHomeHeroImage()}
        imageAlt={`Contact ${BUSINESS_CONFIG.name} — invisible grills and safety nets`}
        fullBleed
        showWhatsApp
        showCall
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionEyebrow>Get in Touch</SectionEyebrow>
            <Heading level={2} className="text-primary mb-6">
              Request a callback
            </Heading>
            <p className="mb-6 text-text-muted">
              Fill the form or reach us directly on phone or WhatsApp for a free site inspection
              and transparent quotation.
            </p>

            <BusinessQuickLinks />

            <dl className="mt-8 space-y-4 text-text-muted">
              <div>
                <dt className="font-semibold text-text">Owner</dt>
                <dd>{ownerName}</dd>
              </div>
              <div>
                <dt className="font-semibold text-text">Phone</dt>
                <dd>
                  <a href={getPhoneUrl()} className="hover:text-accent transition-colors">
                    {phone.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-text">WhatsApp</dt>
                <dd>
                  <a
                    href={getWhatsAppUrl()}
                    className="hover:text-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {whatsapp.display}
                  </a>
                </dd>
              </div>
              {isConfiguredContactValue(email) && (
                <div>
                  <dt className="font-semibold text-text">Email</dt>
                  <dd>
                    <a href={`mailto:${email}`} className="hover:text-accent transition-colors">
                      {email}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt className="font-semibold text-text">Google Maps</dt>
                <dd>
                  <a
                    href={getGoogleMapsUrl()}
                    className="hover:text-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Google Maps
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-text">Website</dt>
                <dd>
                  <a
                    href={BUSINESS_CONFIG.websiteUrl}
                    className="hover:text-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {BUSINESS_CONFIG.websiteUrl.replace(/^https?:\/\//, "")}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-text">Service area</dt>
                <dd>{addressLine || "Bengaluru, Karnataka, India"}</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6 md:p-8">
            <Heading level={2} className="text-primary mb-6">
              Send an Enquiry
            </Heading>
            <ContactForm />
          </div>
        </div>
      </Section>

      <WhyChooseGrid title={`Why contact ${BUSINESS_CONFIG.name}?`} />

      <Section variant="muted" id="faq">
        <SectionEyebrow>FAQ</SectionEyebrow>
        <Heading level={2} className="text-primary mb-8">
          Common questions before you enquire
        </Heading>
        <div className="max-w-3xl">
          <FAQAccordion items={HOME_FAQS.slice(0, 6)} />
        </div>
      </Section>

      <CorePageContent path="/contact/" />
    </>
  );
}
