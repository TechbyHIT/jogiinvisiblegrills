import { WHY_CHOOSE_ITEMS } from "@/config/trust-content";
import { BUSINESS_CONFIG } from "@/config/business";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

type WhyChooseGridProps = {
  title?: string;
};

export function WhyChooseGrid({
  title = `Why Choose ${BUSINESS_CONFIG.name}?`,
}: WhyChooseGridProps) {
  return (
    <Section>
      <SectionEyebrow>Why Choose Us</SectionEyebrow>
      <Heading level={2} className="text-primary mb-8">
        {title}
      </Heading>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {WHY_CHOOSE_ITEMS.map((item) => (
          <li key={item.title} className="hiranya-card p-6">
            <h3 className="font-display text-base font-semibold text-primary">{item.title}</h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">{item.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
