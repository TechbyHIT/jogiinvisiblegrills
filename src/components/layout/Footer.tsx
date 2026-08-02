import Link from "next/link";
import {
  BUSINESS_CONFIG,
  formatBusinessAddress,
  getConfiguredSocialLinks,
  getGoogleMapsUrl,
  getPhoneUrl,
  getWhatsAppUrl,
  isConfiguredContactValue,
} from "@/config/business";
import { Container } from "@/components/ui/Container";

const FOOTER_LINKS = {
  services: [
    { href: "/services/invisible-grills/", label: "Invisible Grills" },
    { href: "/services/balcony-safety-nets/", label: "Balcony Safety Nets" },
    { href: "/services/mosquito-nets/", label: "Mosquito Nets" },
    { href: "/services/", label: "All Services" },
  ],
  company: [
    { href: "/about/", label: "About Us" },
    { href: "/projects/", label: "Projects" },
    { href: "/testimonials/", label: "Testimonials" },
    { href: "/contact/", label: "Contact" },
  ],
  resources: [
    { href: "/guides/", label: "Guides" },
    { href: "/faq/", label: "FAQ" },
    { href: "/sitemap.xml", label: "Sitemap" },
    { href: "/pricing-guide/", label: "Pricing Guide" },
    { href: "/safety-guide/", label: "Safety Guide" },
  ],
  legal: [
    { href: "/privacy-policy/", label: "Privacy Policy" },
    { href: "/terms-and-conditions/", label: "Terms" },
    { href: "/disclaimer/", label: "Disclaimer" },
  ],
};

export function Footer() {
  const { phone, whatsapp, email, ownerName } = BUSINESS_CONFIG;
  const addressLine = formatBusinessAddress();

  return (
    <footer className="border-t border-border bg-primary text-text-inverse mt-auto">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-xl font-bold">{BUSINESS_CONFIG.name}</p>
            <p className="mt-1 text-sm text-slate-400">Owner: {ownerName}</p>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-sm">
              {BUSINESS_CONFIG.description}
            </p>
            <address className="mt-4 not-italic text-sm text-slate-300 space-y-1">
              {addressLine && <p>{addressLine}</p>}
              <p>
                Phone:{" "}
                <a href={getPhoneUrl()} className="hover:text-accent transition-colors">
                  {phone.display}
                </a>
              </p>
              <p>
                WhatsApp:{" "}
                <a
                  href={getWhatsAppUrl()}
                  className="hover:text-accent transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {whatsapp.display}
                </a>
              </p>
              {isConfiguredContactValue(email) && (
                <p>
                  Email:{" "}
                  <a href={`mailto:${email}`} className="hover:text-accent transition-colors">
                    {email}
                  </a>
                </p>
              )}
              <p>
                <a
                  href={getGoogleMapsUrl()}
                  className="hover:text-accent transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Maps
                </a>
              </p>
              <p>
                <a
                  href={BUSINESS_CONFIG.websiteUrl}
                  className="hover:text-accent transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {BUSINESS_CONFIG.websiteUrl.replace(/^https?:\/\//, "")}
                </a>
              </p>
            </address>
            {getConfiguredSocialLinks().length > 1 && (
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                {getConfiguredSocialLinks().map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-slate-300 hover:text-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-4">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-300 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-primary-light flex flex-col sm:flex-row justify-between gap-4 text-sm text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {BUSINESS_CONFIG.legalName}. All rights reserved.
          </p>
          <p>Serving Bengaluru, Mysuru &amp; Karnataka</p>
        </div>
      </Container>
    </footer>
  );
}
