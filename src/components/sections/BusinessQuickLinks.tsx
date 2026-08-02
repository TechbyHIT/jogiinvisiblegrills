import {
  BUSINESS_CONFIG,
  getConfiguredSocialLinks,
  getGoogleMapsUrl,
  getPhoneUrl,
  getWhatsAppUrl,
} from "@/config/business";
import { Button } from "@/components/ui/Button";

type BusinessQuickLinksProps = {
  variant?: "inline" | "stack";
};

/** Call, WhatsApp, Maps and website — one tap from contact sections. */
export function BusinessQuickLinks({ variant = "inline" }: BusinessQuickLinksProps) {
  const social = getConfiguredSocialLinks();
  const wrapClass =
    variant === "stack"
      ? "flex flex-col gap-3"
      : "flex flex-wrap gap-3";

  return (
    <div className={wrapClass}>
      <Button href={getPhoneUrl()} variant="gold" size="sm" external>
        Call {BUSINESS_CONFIG.phone.display}
      </Button>
      <Button href={getWhatsAppUrl()} variant="whatsapp" size="sm" external>
        WhatsApp {BUSINESS_CONFIG.whatsapp.display}
      </Button>
      <Button href={getGoogleMapsUrl()} variant="outline" size="sm" external>
        Google Maps
      </Button>
      {social.map((link) => (
        <Button key={link.label} href={link.href} variant="outline" size="sm" external>
          {link.label}
        </Button>
      ))}
    </div>
  );
}
