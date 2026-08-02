import type { Metadata } from "next";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { getPublishedServices } from "@/data/initial-services";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { CTABanner } from "@/components/sections/CTABanner";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const page = getPublishedPageByPath("/installation-process/");
  return page ? generatePageMetadata(page) : { title: "Installation Process" };
}

export default function InstallationProcessPage() {
  const services = getPublishedServices().slice(0, 4);

  return (
    <>
      <Hero title="Installation Process" subtitle="What to expect from site visit to final safety check." />
      <Section>
        <ol className="max-w-3xl space-y-4 list-decimal list-inside text-text-muted">
          <li>Initial enquiry with photos or basic dimensions</li>
          <li>Site inspection and accurate measurement</li>
          <li>Material selection and quotation approval</li>
          <li>Bracket fixing and component installation</li>
          <li>Tensioning, edge finishing and safety verification</li>
          <li>Handover with maintenance guidance</li>
        </ol>
        <div className="mt-12 space-y-8">
          {services.map((service) => (
            <article key={service.id}>
              <Heading level={3} className="text-primary">{service.shortName}</Heading>
              <ol className="mt-3 space-y-2">
                {service.installationSteps.map((step, i) => (
                  <li key={i} className="text-sm text-text-muted">
                    <span className="font-semibold text-text">{i + 1}.</span> {step}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </Section>
      <CTABanner />
    </>
  );
}
