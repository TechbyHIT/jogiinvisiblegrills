import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { BUSINESS_CONFIG } from "@/config/business";

type CTABannerProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
};

export function CTABanner({
  title = "Ready for a site assessment?",
  description = "Share your measurements or photos on WhatsApp and we will guide you on the right safety solution for your home.",
  primaryLabel = "Get Free Quote",
  primaryHref = "/contact/",
}: CTABannerProps) {
  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsapp.raw.replace(/\D/g, "")}?text=${encodeURIComponent("Hi, I would like to request a quote for safety installation.")}`;

  return (
    <Section variant="primary" className="!bg-primary-dark">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <Heading level={2} className="text-white">
            {title}
          </Heading>
          <p className="mt-2 text-slate-300 max-w-xl">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Button href={primaryHref} variant="gold" size="lg">
            {primaryLabel}
          </Button>
          <Button href={whatsappUrl} variant="whatsapp" size="lg" external>
            WhatsApp Us
          </Button>
          <Button
            href={`tel:${BUSINESS_CONFIG.phone.raw}`}
            variant="outline-light"
            size="lg"
            external
          >
            Call Now
          </Button>
        </div>
      </div>
    </Section>
  );
}
