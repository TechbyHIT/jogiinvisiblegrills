import { getDefaultOpenGraphImage } from "@/config/finalized-images";
import { resolveCanonicalSiteUrl } from "@/lib/site-url";

const DEFAULT_OG_IMAGE = getDefaultOpenGraphImage();

/** Returns false for empty strings and bracket placeholders like [EMAIL_ADDRESS]. */
export function isConfiguredContactValue(value: string | null | undefined): boolean {
  if (!value?.trim()) return false;
  return !/^\[[A-Z0-9_]+\]$/.test(value.trim());
}

export function formatBusinessAddress(): string {
  const { street, city, state, postalCode, country } = BUSINESS_CONFIG.address;
  const locality = [city, state, postalCode].filter(Boolean).join(", ");
  return [street, locality, country].filter(isConfiguredContactValue).join(", ");
}

export function getPhoneUrl(): string {
  return `tel:${BUSINESS_CONFIG.phone.raw}`;
}

export function getMailtoUrl(subject?: string): string {
  const email = BUSINESS_CONFIG.email;
  if (!isConfiguredContactValue(email)) return "/contact/";
  const params = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${email}${params}`;
}

export function getWhatsAppUrl(message?: string): string {
  const text =
    message ??
    `Hi ${BUSINESS_CONFIG.name}, I would like to enquire about invisible grills / safety nets in Bengaluru.`;
  return `https://wa.me/${BUSINESS_CONFIG.whatsapp.raw.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

export function getGoogleMapsUrl(): string {
  if (isConfiguredContactValue(BUSINESS_CONFIG.googleMapsUrl)) {
    return BUSINESS_CONFIG.googleMapsUrl;
  }
  const query = encodeURIComponent(
    `${BUSINESS_CONFIG.name} ${BUSINESS_CONFIG.address.city} ${BUSINESS_CONFIG.address.state}`,
  );
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function getConfiguredSocialLinks(): Array<{ label: string; href: string }> {
  const { socialLinks, websiteUrl } = BUSINESS_CONFIG;
  const links: Array<{ label: string; href: string }> = [
    { label: "Website", href: websiteUrl },
  ];

  if (isConfiguredContactValue(socialLinks.instagram)) {
    links.push({ label: "Instagram", href: socialLinks.instagram });
  }
  if (isConfiguredContactValue(socialLinks.facebook)) {
    links.push({ label: "Facebook", href: socialLinks.facebook });
  }
  if (isConfiguredContactValue(socialLinks.youtube)) {
    links.push({ label: "YouTube", href: socialLinks.youtube });
  }

  return links;
}

export const BUSINESS_CONFIG = {
  /** Public brand (headers, hero, schema) */
  name: "Jogi Invisible Grills",
  /** Legal / invoice entity */
  legalName: "Jogiinvisiblegrills",
  ownerName: "Raju",
  description:
    "Jogi Invisible Grills (Jogiinvisiblegrills) provides professional invisible grills, safety nets, pigeon nets, balcony nets, mosquito nets, cloth hangers and sports nets across Bengaluru, Mysuru and Karnataka. Free site inspection, premium materials and clean installation for homes and apartments.",
  websiteUrl: resolveCanonicalSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  googleMapsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ?? "",

  phone: {
    display: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+91 80197 18338",
    raw: process.env.NEXT_PUBLIC_PHONE_RAW ?? "918019718338",
  },

  whatsapp: {
    display: process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? "+91 63091 88085",
    raw: process.env.NEXT_PUBLIC_WHATSAPP_RAW ?? "916309188085",
  },

  email: process.env.NEXT_PUBLIC_EMAIL ?? "jogiinvisiblegrill@gmail.com",

  address: {
    street: process.env.NEXT_PUBLIC_STREET ?? "",
    city: "Bengaluru",
    district: "Bengaluru Urban",
    state: "Karnataka",
    postalCode: process.env.NEXT_PUBLIC_POSTAL_CODE ?? "",
    country: "India",
  },

  coordinates: {
    latitude: null as number | null,
    longitude: null as number | null,
  },

  logo: "/images/brand/jogi-invisible-grills-logo.png",
  logoWidth: 220,
  logoHeight: 56,
  defaultOpenGraphImage: DEFAULT_OG_IMAGE,

  servicesOffered: [
    "Invisible Grills",
    "Safety Nets",
    "Pigeon Nets",
    "Balcony Nets",
    "Mosquito Nets",
    "Sports Nets",
    "Cloth Hangers",
    "Bird Spikes",
  ] as const,

  serviceArea: {
    primaryCity: "Bengaluru",
    state: "Karnataka",
    country: "India",
    additionalCities: ["Mysuru"] as const,
    additionalStates: [] as const,
  },

  socialLinks: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "",
  },

  analytics: {
    googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID,
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
    clarityId: process.env.NEXT_PUBLIC_CLARITY_ID,
  },

  pricingStatement:
    "Pricing depends on measurements, material grade, required spacing, installation complexity, building height, site accessibility and total project quantity.",
} as const;

export type BusinessConfig = typeof BUSINESS_CONFIG;
