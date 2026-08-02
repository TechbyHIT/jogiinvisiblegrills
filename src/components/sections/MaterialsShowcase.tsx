import { MATERIAL_TYPES } from "@/config/trust-content";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function MaterialsShowcase() {
  return (
    <Section id="materials">
      <SectionEyebrow>Materials</SectionEyebrow>
      <Heading level={2} className="text-primary mb-2">
        Materials we use
      </Heading>
      <p className="mb-8 max-w-2xl text-sm text-text-muted">
        Certified, weather-aware materials selected for each opening type — not one-size-fits-all
        templates.
      </p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MATERIAL_TYPES.map((material) => (
          <li
            key={material.name}
            className="rounded-lg border border-border bg-white p-5 shadow-sm"
          >
            <h3 className="font-display font-semibold text-primary">{material.name}</h3>
            <ul className="mt-3 space-y-1">
              {material.traits.map((trait) => (
                <li key={trait} className="flex items-start gap-2 text-sm text-text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
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
