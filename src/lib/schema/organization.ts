import { BUSINESS_CONFIG, isConfiguredContactValue } from "@/config/business";
import { SITE_CONFIG } from "@/config/site";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS_CONFIG.name,
    legalName: BUSINESS_CONFIG.legalName,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}${BUSINESS_CONFIG.logo}`,
    ...(isConfiguredContactValue(BUSINESS_CONFIG.email)
      ? { email: BUSINESS_CONFIG.email }
      : {}),
    telephone: BUSINESS_CONFIG.phone.raw,
    sameAs: Object.values(BUSINESS_CONFIG.socialLinks).filter(isConfiguredContactValue),
    description: BUSINESS_CONFIG.description,
  };
}
