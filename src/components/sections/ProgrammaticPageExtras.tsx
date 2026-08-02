import { HowItWorks } from "@/components/sections/HowItWorks";
import { MaterialsShowcase } from "@/components/sections/MaterialsShowcase";
import { NetTypesSection } from "@/components/sections/NetTypesSection";
import { BrandsStrip } from "@/components/sections/BrandsStrip";
import { RequirementCards } from "@/components/sections/RequirementCards";
import { WhyChooseGrid } from "@/components/sections/WhyChooseGrid";

type ProgrammaticPageExtrasProps = {
  categorySlug?: string;
  serviceName?: string;
};

/** Featherguard-style trust blocks on service and programmatic pages. */
export function ProgrammaticPageExtras({
  categorySlug,
  serviceName,
}: ProgrammaticPageExtrasProps) {
  const whyTitle = serviceName
    ? `Why Choose Us for ${serviceName}`
    : "Trusted by hundreds of families & businesses";

  return (
    <>
      <WhyChooseGrid title={whyTitle} />
      <HowItWorks />
      <NetTypesSection />
      <MaterialsShowcase />
      <BrandsStrip />
      <RequirementCards highlightCategory={categorySlug} />
    </>
  );
}
