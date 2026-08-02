import type { Metadata } from "next";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { getTestimonials } from "@/data/testimonials";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { CTABanner } from "@/components/sections/CTABanner";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const page = getPublishedPageByPath("/testimonials/");
  return page ? generatePageMetadata(page) : { title: "Testimonials" };
}

export default function TestimonialsPage() {
  const testimonials = getTestimonials();

  return (
    <>
      <Hero title="Customer Testimonials" subtitle="What homeowners say about our safety installations." />
      <Section>
        <ul className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
          {testimonials.map((t) => (
            <li key={t.id} className="rounded-lg border border-border p-6 bg-surface">
              <blockquote className="text-text-muted italic">&ldquo;{t.quote}&rdquo;</blockquote>
              <footer className="mt-4 text-sm">
                <cite className="font-semibold text-primary not-italic">{t.name}</cite>
                <p className="text-text-muted">{t.locality}</p>
                <p className="text-xs text-text-muted mt-1">{t.context}</p>
              </footer>
            </li>
          ))}
        </ul>
      </Section>
      <CTABanner />
    </>
  );
}
