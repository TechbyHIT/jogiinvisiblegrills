import { BUSINESS_CONFIG } from "@/config/business";
import { SITE_CONFIG } from "@/config/site";
import { getHeroForService } from "@/config/finalized-images";
import type { ServiceRecord } from "@/types";

export function buildServiceSchema(service: ServiceRecord, pageUrl: string) {
  const imageSrc = getHeroForService(service.slug, service.slug);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    url: pageUrl,
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: BUSINESS_CONFIG.serviceArea.state,
    },
    serviceType: service.name,
    image: `${SITE_CONFIG.url}${imageSrc}`,
  };
}
