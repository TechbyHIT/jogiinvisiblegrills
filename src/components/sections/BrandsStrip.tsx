import { HOME_TRUSTED_BRANDS } from "@/config/home-content";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Heading } from "@/components/ui/Heading";

export function BrandsStrip() {
  return (
    <Section className="!py-10">
      <SectionEyebrow>Materials &amp; Brands</SectionEyebrow>
      <Heading level={2} className="text-primary mb-2">
        Brands you can trust
      </Heading>
      <p className="mb-6 max-w-2xl text-sm text-text-muted">
        We partner with industry-leading mesh and cable specifications — selected per project, not
        pushed as one-size-fits-all.
      </p>
      <ul className="flex flex-wrap gap-3">
        {HOME_TRUSTED_BRANDS.map((brand) => (
          <li
            key={brand}
            className="rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-primary shadow-sm"
          >
            {brand}
          </li>
        ))}
      </ul>
    </Section>
  );
}
