import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { getPublishedGuides } from "@/data/guides";
import { guidePath } from "@/config/routes";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { CTABanner } from "@/components/sections/CTABanner";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const page = getPublishedPageByPath("/guides/");
  return page ? generatePageMetadata(page) : { title: "Guides" };
}

export default function GuidesPage() {
  const guides = getPublishedGuides();

  return (
    <>
      <Hero title="Safety Guides" subtitle="Practical advice for choosing and maintaining home safety installations." />
      <Section>
        <Heading level={2} className="text-primary mb-8">All Guides</Heading>
        <ul className="grid gap-4 sm:grid-cols-2">
          {guides.map((guide) => (
            <li key={guide.id}>
              <Link href={guidePath(guide.slug)} className="block rounded-lg border border-border p-5 hover:border-accent transition-colors">
                <h3 className="font-display font-semibold text-primary">{guide.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{guide.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CTABanner />
    </>
  );
}
