import Image from "next/image";
import type { ReactNode } from "react";
import { BUSINESS_CONFIG } from "@/config/business";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

const DEFAULT_TRUST_PILLS = [
  "Certified Installation",
  "Warranty Support",
  "Premium Materials",
  "Fast Installation",
  "Affordable Pricing",
  "Free Inspection",
];

type HeroProps = {
  title: string;
  subtitle?: string;
  badge?: string;
  image?: string;
  imageAlt?: string;
  fullBleed?: boolean;
  children?: ReactNode;
  trustPills?: string[];
  showDefaultTrustPills?: boolean;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  showWhatsApp?: boolean;
  showCall?: boolean;
  /** Locality coverage line shown under subtitle (Hiranya-style). */
  localityLine?: string;
};

export function Hero({
  title,
  subtitle,
  badge,
  image,
  imageAlt,
  fullBleed = false,
  children,
  trustPills,
  showDefaultTrustPills = false,
  primaryCta,
  secondaryCta,
  showWhatsApp = false,
  showCall = false,
  localityLine,
}: HeroProps) {
  const pills = trustPills ?? (showDefaultTrustPills ? DEFAULT_TRUST_PILLS : []);
  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsapp.raw.replace(/\D/g, "")}`;

  const ctaBlock = (primaryCta || secondaryCta || showWhatsApp || showCall) && (
    <div className="mt-8 flex flex-wrap gap-3">
      {primaryCta && (
        <Button href={primaryCta.href} variant="gold" size="lg" className="shadow-lg">
          {primaryCta.label}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Button>
      )}
      {showWhatsApp && (
        <Button href={whatsappUrl} variant="whatsapp" size="lg" external className="shadow-lg">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp Now
        </Button>
      )}
      {(showCall || secondaryCta) && (
        <Button
          href={showCall ? `tel:${BUSINESS_CONFIG.phone.raw}` : secondaryCta!.href}
          variant="outline-light"
          size="lg"
          external={showCall}
          className="shadow-lg"
        >
          {showCall ? (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </>
          ) : (
            secondaryCta!.label
          )}
        </Button>
      )}
    </div>
  );

  const pillsBlock = pills.length > 0 && (
    <div className="mt-8 flex flex-wrap gap-2">
      {pills.map((pill) => (
        <span
          key={pill}
          className="inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 px-3 py-1.5 text-xs font-medium text-white"
        >
          <svg className="h-3.5 w-3.5 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {pill}
        </span>
      ))}
    </div>
  );

  if (fullBleed && image) {
    return (
      <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center">
        <Image
          src={image}
          alt={imageAlt ?? title}
          fill
          priority
          quality={90}
          className="object-cover object-[center_35%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/75 to-primary-dark/40" />
        <Container className="relative z-10 py-16 md:py-24">
          {badge && (
            <span className="inline-block rounded-full bg-gold/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-dark mb-5">
              {badge}
            </span>
          )}
          <Heading level={1} className="text-white max-w-4xl text-3xl md:text-4xl lg:text-5xl leading-tight">
            {title}
          </Heading>
          {subtitle && (
            <p className="mt-5 text-base md:text-lg text-slate-200 max-w-3xl leading-relaxed">{subtitle}</p>
          )}
          {localityLine && (
            <p className="mt-4 text-sm text-slate-300/90 max-w-3xl leading-relaxed border-l-2 border-gold pl-4">
              {localityLine}
            </p>
          )}
          {ctaBlock}
          {pillsBlock}
          {children}
        </Container>
      </section>
    );
  }

  return (
    <section className="hero-gradient py-16 md:py-24">
      <Container>
        {badge && (
          <span className="inline-block rounded-full bg-gold/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-dark mb-5">
            {badge}
          </span>
        )}
        <Heading level={1} className="text-white max-w-3xl">
          {title}
        </Heading>
        {subtitle && (
          <p className="mt-4 text-lg text-slate-200 max-w-2xl">{subtitle}</p>
        )}
        {localityLine && (
          <p className="mt-3 text-sm text-slate-300 max-w-2xl border-l-2 border-gold pl-4">{localityLine}</p>
        )}
        {ctaBlock}
        {pillsBlock}
        {children}
      </Container>
    </section>
  );
}
