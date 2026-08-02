import Link from "next/link";
import { HOME_QUICK_SERVICE_LINKS } from "@/config/home-content";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Heading } from "@/components/ui/Heading";

export function ServiceQuickLinksSection() {
  return (
    <Section variant="muted" className="!py-10">
      <SectionEyebrow>Quick Links</SectionEyebrow>
      <Heading level={2} className="text-primary mb-2">
        Our services in Bengaluru &amp; Mysuru
      </Heading>
      <p className="mb-6 max-w-2xl text-sm text-text-muted">
        Jump directly to city-specific service pages — pigeon nets, invisible grills, safety nets and
        more.
      </p>
      <ul className="flex flex-wrap gap-2">
        {HOME_QUICK_SERVICE_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm hover:border-gold hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
