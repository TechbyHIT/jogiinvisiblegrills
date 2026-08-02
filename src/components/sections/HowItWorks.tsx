import { HOW_IT_WORKS_STEPS } from "@/config/trust-content";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function HowItWorks() {
  return (
    <Section variant="muted">
      <SectionEyebrow>How It Works</SectionEyebrow>
      <Heading level={2} className="text-primary mb-2">
        Simple 5-step installation process
      </Heading>
      <p className="mb-10 max-w-2xl text-sm text-text-muted">
        From free inspection to warranty handover — designed for speed, safety and zero surprises.
      </p>
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {HOW_IT_WORKS_STEPS.map((item) => (
          <li
            key={item.step}
            className="relative rounded-lg border border-border bg-white p-5 shadow-sm"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-bold text-primary">
              {item.step}
            </span>
            <h3 className="mt-3 font-display text-base font-semibold text-primary">{item.title}</h3>
            <p className="mt-2 text-sm text-text-muted">{item.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
