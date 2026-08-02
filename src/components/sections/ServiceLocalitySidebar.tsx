import Link from "next/link";
import {
  BUSINESS_CONFIG,
  formatBusinessAddress,
  getPhoneUrl,
  getWhatsAppUrl,
} from "@/config/business";
import { WHY_CHOOSE_ITEMS } from "@/config/trust-content";
import { Button } from "@/components/ui/Button";
import type { InternalLink } from "@/types";

type ServiceLocalitySidebarProps = {
  serviceName: string;
  serviceSlug: string;
  locationLabel: string;
  nearbyLinks?: InternalLink[];
};

function PinIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-gold" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-gold" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

/** Featherguard-style sticky sidebar: contact card, nearby areas, why choose. */
export function ServiceLocalitySidebar({
  serviceName,
  serviceSlug,
  locationLabel,
  nearbyLinks = [],
}: ServiceLocalitySidebarProps) {
  const { phone, ownerName } = BUSINESS_CONFIG;
  const serviceArea = formatBusinessAddress() || "Bengaluru & Mysuru, Karnataka";

  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-xl bg-primary p-6 text-white shadow-lg">
        <h2 className="text-lg font-bold leading-snug">
          {serviceName} in {locationLabel}
        </h2>
        <ul className="mt-5 space-y-3 text-sm text-slate-200">
          <li className="flex items-start gap-3">
            <PinIcon />
            <span>
              <span className="font-semibold text-white block">Service Area</span>
              {serviceArea}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <PhoneIcon />
            <span>
              <span className="font-semibold text-white block">Phone</span>
              <a href={getPhoneUrl()} className="hover:text-gold transition-colors">
                {phone.display}
              </a>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <ClockIcon />
            <span>
              <span className="font-semibold text-white block">Working Hours</span>
              Mon – Sat: 9 AM – 8 PM
            </span>
          </li>
        </ul>
        <div className="mt-6 flex flex-col gap-2">
          <Button href="/contact/" variant="gold" size="md" className="w-full justify-center">
            Get Free Quote
          </Button>
          <Button href={getWhatsAppUrl()} variant="whatsapp" size="sm" external className="w-full justify-center">
            WhatsApp {ownerName}
          </Button>
        </div>
      </div>

      {nearbyLinks.length > 0 && (
        <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-primary mb-3">Nearby Service Areas</h3>
          <ul className="flex flex-wrap gap-2">
            {nearbyLinks.slice(0, 14).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-primary hover:border-gold hover:text-gold transition-colors"
                >
                  {link.label.replace(new RegExp(`^${serviceName}\\s+in\\s+`, "i"), "").replace(new RegExp(`^${serviceSlug.replace(/-/g, " ")}\\s+in\\s+`, "i"), "") || link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-primary mb-4">Why Choose {BUSINESS_CONFIG.name}?</h3>
        <ul className="space-y-3">
          {WHY_CHOOSE_ITEMS.map((item) => (
            <li key={item.title} className="flex items-start gap-2 text-sm text-text-muted">
              <CheckIcon />
              <span>
                <span className="font-semibold text-primary block">{item.title}</span>
                {item.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
