import { TESTIMONIALS, type TestimonialRecord } from "@/data/testimonials";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

type TestimonialsStripProps = {
  serviceSlug?: string;
  title?: string;
  limit?: number;
};

function pickTestimonials(serviceSlug?: string, limit = 4): TestimonialRecord[] {
  if (serviceSlug) {
    const matched = TESTIMONIALS.filter((item) => item.serviceSlug === serviceSlug);
    if (matched.length >= limit) return matched.slice(0, limit);
    const rest = TESTIMONIALS.filter((item) => item.serviceSlug !== serviceSlug);
    return [...matched, ...rest].slice(0, limit);
  }
  return TESTIMONIALS.slice(0, limit);
}

export function TestimonialsStrip({
  serviceSlug,
  title = "What our customers say",
  limit = 4,
}: TestimonialsStripProps) {
  const items = pickTestimonials(serviceSlug, limit);
  if (items.length === 0) return null;

  return (
    <Section variant="muted" id="testimonials">
      <SectionEyebrow>Testimonials</SectionEyebrow>
      <Heading level={2} className="text-primary mb-2">
        {title}
      </Heading>
      <p className="mb-8 text-sm text-text-muted max-w-2xl">
        Real reviews from families and businesses across Bengaluru &amp; Mysuru.
      </p>
      <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col rounded-xl border border-border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
                aria-hidden="true"
              >
                {item.initials}
              </span>
              <div>
                <p className="font-semibold text-primary text-sm">{item.name}</p>
                <p className="text-xs text-text-muted">{item.locality}</p>
              </div>
            </div>
            <blockquote className="mt-4 flex-1 text-sm text-text-muted leading-relaxed">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <p className="mt-3 text-xs font-medium text-gold">Verified customer review</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
