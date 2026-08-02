import { BUSINESS_CONFIG } from "@/config/business";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Heading } from "@/components/ui/Heading";

const PILLARS = [
  {
    title: "Our Vision",
    text: "To make every home in Karnataka safer with premium, near-invisible safety solutions.",
  },
  {
    title: "Our Mission",
    text: "Honest pricing, premium materials and flawless installation, every time.",
  },
  {
    title: "Our Promise",
    text: "Clean finishing, on-time service and dependable after-sales support.",
  },
];

export function AboutSection() {
  return (
    <Section id="about">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
        <div>
          <SectionEyebrow>About {BUSINESS_CONFIG.name}</SectionEyebrow>
          <Heading level={2} className="text-primary mb-4">
            Premium safety solutions, built around your family
          </Heading>
          <p className="text-text-muted leading-relaxed mb-4">
            Led by {BUSINESS_CONFIG.ownerName}, we design, supply and install premium invisible
            grills, safety nets and bird protection systems for homes, apartments and commercial
            spaces across Bengaluru &amp; Mysuru.
          </p>
          <p className="text-text-muted leading-relaxed">
            At {BUSINESS_CONFIG.name}, safety is never a compromise on style. Our certified team uses
            marine-grade materials and proven installation methods to deliver protection that lasts —
            without blocking your view, light or airflow.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {PILLARS.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-border bg-surface p-5 shadow-sm"
            >
              <h3 className="font-display text-base font-semibold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
