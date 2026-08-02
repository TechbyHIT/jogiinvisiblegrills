export type TestimonialRecord = {
  id: string;
  name: string;
  initials: string;
  locality: string;
  serviceSlug: string;
  quote: string;
  context: string;
};

export const TESTIMONIALS: TestimonialRecord[] = [
  {
    id: "testimonial-whitefield-invisible-grill",
    name: "Ramesh Kumar",
    initials: "RK",
    locality: "Whitefield, Bengaluru",
    serviceSlug: "invisible-grills",
    quote:
      "Got invisible grills installed on our 12th-floor balcony. The view is completely clear and the kids are safe. Very professional and clean work.",
    context: "High-rise balcony invisible grill installation",
  },
  {
    id: "testimonial-koramangala-balcony-net",
    name: "Priya Nair",
    initials: "PN",
    locality: "Koramangala, Bengaluru",
    serviceSlug: "balcony-safety-nets",
    quote:
      "Excellent balcony safety nets for our cat. The team did the measurement carefully and finished neatly. Highly recommend Jogendhra Safety Nets.",
    context: "Balcony safety net for pets",
  },
  {
    id: "testimonial-mysuru-pigeon-net",
    name: "Suresh Gowda",
    initials: "SG",
    locality: "Kuvempunagar, Mysuru",
    serviceSlug: "balcony-safety-nets",
    quote:
      "Pigeon problem on our balcony is finally solved. The net is barely visible and very strong. Fair pricing and on-time installation.",
    context: "Balcony pigeon net installation",
  },
  {
    id: "testimonial-hsr-invisible-grill",
    name: "Anjali Reddy",
    initials: "AR",
    locality: "HSR Layout, Bengaluru",
    serviceSlug: "invisible-grills",
    quote:
      "We compared a few vendors and Jogendhra gave the best material quality for invisible grills. Two years on, no rust and rock solid.",
    context: "Stainless steel invisible grill project",
  },
  {
    id: "testimonial-indiranagar-mosquito-net",
    name: "Meera Venkat",
    initials: "MV",
    locality: "Indiranagar, Bengaluru",
    serviceSlug: "mosquito-nets",
    quote:
      "Sliding mosquito nets fitted on four windows. Frames align perfectly and the mesh lets air in without insects. Clean installation.",
    context: "Window mosquito net installation",
  },
  {
    id: "testimonial-jayanagar-child-safety",
    name: "Lakshmi Devi",
    initials: "LD",
    locality: "Jayanagar, Bengaluru",
    serviceSlug: "children-safety-nets",
    quote:
      "Child safety nets on our balcony give us peace of mind. Tight mesh, neat edges and the installer explained maintenance after monsoon.",
    context: "Children safety net balcony project",
  },
];

export function getTestimonials() {
  return TESTIMONIALS;
}

export function getTestimonialsByServiceSlug(serviceSlug: string) {
  return TESTIMONIALS.filter((item) => item.serviceSlug === serviceSlug);
}
