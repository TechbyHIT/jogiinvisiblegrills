export const ANALYTICS_EVENTS = {
  PAGE_VIEW: "page_view",
  CONTACT_FORM_SUBMIT: "contact_form_submit",
  QUICK_ENQUIRY_SUBMIT: "quick_enquiry_submit",
  WHATSAPP_CLICK: "whatsapp_click",
  PHONE_CLICK: "phone_click",
  SERVICE_CTA_CLICK: "service_cta_click",
  LOCATION_CTA_CLICK: "location_cta_click",
  INTERNAL_LINK_CLICK: "internal_link_click",
  GUIDE_READ: "guide_read",
  BLOG_READ: "blog_read",
  GALLERY_VIEW: "gallery_view",
  TESTIMONIAL_VIEW: "testimonial_view",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type AnalyticsEventPayload = {
  event: AnalyticsEventName;
  path?: string;
  label?: string;
  value?: string | number;
};

export function createAnalyticsEvent(
  event: AnalyticsEventName,
  payload: Omit<AnalyticsEventPayload, "event"> = {},
): AnalyticsEventPayload {
  return {
    event,
    ...payload,
  };
}
