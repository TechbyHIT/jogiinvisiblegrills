import type { Metadata } from "next";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { getPublishedServices } from "@/data/initial-services";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { CTABanner } from "@/components/sections/CTABanner";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const page = getPublishedPageByPath("/projects/");
  return page ? generatePageMetadata(page) : { title: "Projects" };
}

export default function ProjectsPage() {
  const services = getPublishedServices();

  return (
    <>
      <Hero title="Recent Projects" subtitle="Representative installations completed across our service area." />
      <Section>
        <ul className="space-y-8 max-w-3xl">
          {services.slice(0, 6).map((service) => (
            <li key={service.id} className="border-b border-border pb-8 last:border-0">
              <h2 className="font-display text-xl font-semibold text-primary">{service.name}</h2>
              <p className="mt-2 text-text-muted">{service.summary}</p>
              <ul className="mt-3 text-sm text-text-muted list-disc list-inside">
                {service.applications.slice(0, 3).map((app) => (
                  <li key={app}>{app}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>
      <CTABanner />
    </>
  );
}
