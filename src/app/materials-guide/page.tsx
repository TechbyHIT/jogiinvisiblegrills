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
  const page = getPublishedPageByPath("/materials-guide/");
  return page ? generatePageMetadata(page) : { title: "Materials Guide" };
}

export default function MaterialsGuidePage() {
  const services = getPublishedServices();

  return (
    <>
      <Hero title="Materials Guide" subtitle="Materials we use for durable, corrosion-conscious installations." />
      <Section>
        <div className="space-y-10 max-w-3xl">
          {services.map((service) => (
            <article key={service.id}>
              <Heading level={2} className="text-primary">{service.shortName}</Heading>
              <ul className="mt-3 list-disc list-inside text-text-muted space-y-1">
                {service.materials.map((m) => (
                  <li key={m}>{m}</li>
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
