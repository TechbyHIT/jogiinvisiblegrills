import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { getPublishedProblems } from "@/data/problems";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { solutionPath } from "@/config/routes";
import { CorePageContent } from "@/components/sections/CorePageContent";
import { CTABanner } from "@/components/sections/CTABanner";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const page = getPublishedPageByPath("/solutions/");
  return page ? generatePageMetadata(page) : { title: "Safety Solutions" };
}

export default function SolutionsPage() {
  const problems = getPublishedProblems();

  return (
    <>
      <Hero title="Safety Solutions" subtitle="Find the right protection for your specific home safety concern." />
      <Section>
        <Heading level={2} className="text-primary mb-8">Browse by Problem</Heading>
        <ul className="grid gap-4 sm:grid-cols-2">
          {problems.map((problem) => (
            <li key={problem.id}>
              <Link href={solutionPath(problem.slug)} className="block rounded-lg border border-border p-5 hover:border-accent hover:shadow-sm transition-all">
                <h3 className="font-display font-semibold text-primary">{problem.name}</h3>
                <p className="mt-2 text-sm text-text-muted">{problem.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CorePageContent path="/solutions/" />
      <CTABanner />
    </>
  );
}
