import { HOME_SEO_GUIDE } from "@/config/home-content";
import { Section } from "@/components/ui/Section";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Heading } from "@/components/ui/Heading";

export function HomeSeoGuideSection() {
  return (
    <Section variant="muted" id="complete-guide">
      <SectionEyebrow>Complete Guide</SectionEyebrow>
      <Heading level={2} className="text-primary mb-6 max-w-4xl">
        {HOME_SEO_GUIDE.title}
      </Heading>
      <p className="mb-10 max-w-3xl text-text-muted leading-relaxed">{HOME_SEO_GUIDE.intro}</p>

      <div className="space-y-10">
        {HOME_SEO_GUIDE.sections.map((section) => (
          <article key={section.id} id={section.id} className="max-w-3xl">
            <Heading level={3} className="text-primary mb-4 text-xl">
              {section.heading}
            </Heading>
            <div className="space-y-4 text-text-muted leading-relaxed">
              {section.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            {section.bullets && section.bullets.length > 0 && (
              <ul className="mt-4 space-y-2">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-text-muted">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                      aria-hidden="true"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
