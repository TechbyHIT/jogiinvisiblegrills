import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { getPublishedPropertyTypes } from "@/data/property-types";
import { getPublishedServices } from "@/data/initial-services";
import { propertyTypeServicePath } from "@/config/routes";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { CTABanner } from "@/components/sections/CTABanner";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const page = getPublishedPageByPath("/property-types/");
  return page ? generatePageMetadata(page) : { title: "Property Types" };
}

export default function PropertyTypesPage() {
  const propertyTypes = getPublishedPropertyTypes();
  const services = getPublishedServices();

  return (
    <>
      <Hero title="Property Types" subtitle="Safety recommendations tailored to your property type." />
      <Section>
        <div className="grid gap-8">
          {propertyTypes.map((pt) => {
            const suitable = services.filter((s) => pt.suitableServiceIds.includes(s.id));
            return (
              <article key={pt.id} className="rounded-lg border border-border p-6">
                <Heading level={2} className="text-primary">{pt.name}</Heading>
                <p className="mt-2 text-text-muted">{pt.summary}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {suitable.map((service) => (
                    <li key={service.id}>
                      <Link href={propertyTypeServicePath(pt.slug, service.slug)} className="text-sm font-medium text-primary hover:text-accent">
                        {service.shortName} for {pt.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Section>
      <CTABanner />
    </>
  );
}
