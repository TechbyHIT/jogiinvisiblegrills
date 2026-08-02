import { BUSINESS_CONFIG } from "@/config/business";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

const TRUST_PILLS = [
  "Certified Installation",
  "Warranty Support",
  "Premium Materials",
  "Fast Installation",
  "Affordable Pricing",
  "Free Inspection",
];

const TRUST_POINTS = [
  "Free site inspection & measurement",
  "Transparent, itemised pricing",
  "Certified technicians & premium materials",
];

type ContactQuoteSectionProps = {
  defaultServiceSlug?: string;
  id?: string;
};

export function ContactQuoteSection({ defaultServiceSlug, id = "contact" }: ContactQuoteSectionProps) {
  return (
    <Section id={id} className="!bg-surface">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionEyebrow>Get In Touch</SectionEyebrow>
          <Heading level={2} className="text-primary mb-4">
            Request your free quote
          </Heading>
          <p className="text-text-muted mb-6 leading-relaxed">
            Fill the form and we will reach out on WhatsApp, or call us directly for an instant
            response across Bengaluru &amp; Mysuru.
          </p>
          <ul className="flex flex-wrap gap-2 mb-6">
            {TRUST_PILLS.map((pill) => (
              <li
                key={pill}
                className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-primary"
              >
                {pill}
              </li>
            ))}
          </ul>
          <ul className="space-y-2 mb-8">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-text-muted">
                <svg className="h-4 w-4 text-gold shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Button href={`tel:${BUSINESS_CONFIG.phone.raw}`} variant="gold" size="lg" external>
              Call {BUSINESS_CONFIG.phone.display}
            </Button>
            <Button
              href={`https://wa.me/${BUSINESS_CONFIG.whatsapp.raw.replace(/\D/g, "")}`}
              variant="whatsapp"
              size="lg"
              external
            >
              WhatsApp Now
            </Button>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm">
          <Heading level={3} className="text-primary mb-6">
            Get a Free Quote
          </Heading>
          <QuoteForm defaultServiceSlug={defaultServiceSlug} />
          <p className="mt-4 text-xs text-text-muted">
            Submitting opens WhatsApp with your details pre-filled. We never share your information.
          </p>
        </div>
      </div>
    </Section>
  );
}
