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
  const page = getPublishedPageByPath("/safety-guide/");
  return page ? generatePageMetadata(page) : { title: "Safety Guide" };
}

export default function SafetyGuidePage() {
  const services = getPublishedServices();

  return (
    <>
      <Hero title="Safety Guide" subtitle="Important safety information for home safety installations." />
      <Section>
        <div className="max-w-3xl space-y-8">
          {services.map((service) => (
            <article key={service.id}>
              <Heading level={2} className="text-primary">{service.shortName}</Heading>
              <ul className="mt-3 list-disc list-inside text-text-muted space-y-2">
                {service.safetyInformation.map((info) => (
                  <li key={info}>{info}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>
      <CTABanner />
    </>
  );
}
