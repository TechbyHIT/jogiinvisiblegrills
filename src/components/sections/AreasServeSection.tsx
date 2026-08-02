import Link from "next/link";
import { buildProgrammaticPath } from "@/lib/routing/parse-programmatic-slug";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Heading } from "@/components/ui/Heading";

const CITIES = [
  {
    slug: "bengaluru",
    name: "Bengaluru",
    description:
      "Bengaluru's high-rise apartments, gated communities and independent homes need reliable safety solutions. We install premium invisible grills, safety nets and bird protection across the city.",
    href: buildProgrammaticPath("invisible-grills", "bengaluru"),
  },
  {
    slug: "mysuru",
    name: "Mysuru",
    description:
      "From heritage neighbourhoods to modern layouts, Mysuru homes trust us for invisible grills, balcony safety nets and bird protection that blend safety with clean aesthetics.",
    href: buildProgrammaticPath("invisible-grills", "mysuru"),
  },
] as const;

export function AreasServeSection() {
  return (
    <Section variant="muted" id="areas">
      <SectionEyebrow>Areas We Serve</SectionEyebrow>
      <Heading level={2} className="text-primary mb-2">
        Serving Bengaluru &amp; Mysuru
      </Heading>
      <p className="mb-8 max-w-2xl text-text-muted">
        Local teams, fast service and free inspection across Karnataka.
      </p>
      <ul className="grid gap-6 md:grid-cols-2">
        {CITIES.map((city) => (
          <li
            key={city.slug}
            className="rounded-xl border border-border bg-white p-6 md:p-8 shadow-sm"
          >
            <h3 className="font-display text-xl font-semibold text-primary">{city.name}</h3>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">{city.description}</p>
            <Link
              href={city.href}
              className="mt-5 inline-flex items-center text-sm font-semibold text-gold hover:underline"
            >
              View city hub →
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
