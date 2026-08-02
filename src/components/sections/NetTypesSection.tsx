import { HOME_NET_TYPES } from "@/config/home-content";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Heading } from "@/components/ui/Heading";

export function NetTypesSection() {
  return (
    <Section variant="muted" id="net-types">
      <SectionEyebrow>Materials</SectionEyebrow>
      <Heading level={2} className="text-primary mb-2">
        Types of safety nets we use
      </Heading>
      <p className="mb-8 max-w-2xl text-text-muted">
        Certified, weather-aware materials for every opening — HDPE mesh, stainless cables, mosquito
        frames and sports-grade netting.
      </p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {HOME_NET_TYPES.map((net) => (
          <li
            key={net.name}
            className="rounded-xl border border-border bg-white p-5 shadow-sm"
          >
            <h3 className="font-display font-semibold text-primary">{net.name}</h3>
            <p className="mt-2 text-sm text-text-muted">{net.description}</p>
            <ul className="mt-3 space-y-1">
              {net.traits.map((trait) => (
                <li key={trait} className="flex items-start gap-2 text-sm text-text-muted">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                    aria-hidden="true"
                  />
                  {trait}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
