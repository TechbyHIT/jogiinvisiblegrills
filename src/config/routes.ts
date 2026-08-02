export const STATIC_ROUTES = [
  "/",
  "/about/",
  "/contact/",
  "/services/",
  "/locations/",
  "/solutions/",
  "/property-types/",
  "/guides/",
  "/blog/",
  "/gallery/",
  "/projects/",
  "/testimonials/",
  "/faq/",
  "/pricing-guide/",
  "/materials-guide/",
  "/installation-process/",
  "/safety-guide/",
  "/privacy-policy/",
  "/terms-and-conditions/",
  "/disclaimer/",
  "/thank-you/",
] as const;

export function servicePath(serviceSlug: string) {
  return `/services/${serviceSlug}/`;
}

export function locationPath(locationSlug: string) {
  return `/locations/${locationSlug}/`;
}

export function areaPath(locationSlug: string, areaSlug: string) {
  return `/locations/${locationSlug}/${areaSlug}/`;
}

export function cityServicePath(locationSlug: string, serviceSlug: string) {
  return `/${locationSlug}/${serviceSlug}/`;
}

export function areaServicePath(
  locationSlug: string,
  areaSlug: string,
  serviceSlug: string,
) {
  return `/${locationSlug}/${areaSlug}/${serviceSlug}/`;
}

export function solutionPath(problemSlug: string) {
  return `/solutions/${problemSlug}/`;
}

export function propertyTypeServicePath(
  propertyTypeSlug: string,
  serviceSlug: string,
) {
  return `/property-types/${propertyTypeSlug}/${serviceSlug}/`;
}

export function guidePath(guideSlug: string) {
  return `/guides/${guideSlug}/`;
}

export function blogPath(postSlug: string) {
  return `/blog/${postSlug}/`;
}
