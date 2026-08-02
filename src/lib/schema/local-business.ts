import { BUSINESS_CONFIG, isConfiguredContactValue } from "@/config/business";
import { SITE_CONFIG } from "@/config/site";

export function buildLocalBusinessSchema() {
  const address = BUSINESS_CONFIG.address;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS_CONFIG.name,
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}${BUSINESS_CONFIG.defaultOpenGraphImage}`,
    telephone: BUSINESS_CONFIG.phone.raw,
    ...(isConfiguredContactValue(BUSINESS_CONFIG.email)
      ? { email: BUSINESS_CONFIG.email }
      : {}),
    description: BUSINESS_CONFIG.description,
    address: {
      "@type": "PostalAddress",
      ...(isConfiguredContactValue(address.street)
        ? { streetAddress: address.street }
        : {}),
      addressLocality: address.city,
      addressRegion: address.state,
      ...(isConfiguredContactValue(address.postalCode)
        ? { postalCode: address.postalCode }
        : {}),
      addressCountry: address.country,
    },
    areaServed: [
      { "@type": "City", name: "Bengaluru" },
      { "@type": "City", name: "Mysuru" },
    ],
    ...(BUSINESS_CONFIG.coordinates.latitude && BUSINESS_CONFIG.coordinates.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: BUSINESS_CONFIG.coordinates.latitude,
            longitude: BUSINESS_CONFIG.coordinates.longitude,
          },
        }
      : {}),
  };
}
