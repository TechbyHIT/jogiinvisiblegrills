import type { ReactNode } from "react";
import type { AssembledPageContent } from "@/lib/content/assemble-page-content";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import Image from "next/image";

type GalleryImage = { src: string; alt: string };

type ContentSectionsProps = {
  content: AssembledPageContent;
  introClassName?: string;
  /** Rotating finalized project images inserted between sections. */
  galleryImages?: GalleryImage[];
  /** Lighter layout for inside the service page main column (no full-width Section wrappers). */
  embedded?: boolean;
};

function sectionImage(
  galleryImages: GalleryImage[],
  index: number,
): GalleryImage | undefined {
  if (galleryImages.length === 0) return undefined;
  return galleryImages[(index + 1) % galleryImages.length];
}

function SectionBlock({
  embedded,
  variant,
  id,
  children,
}: {
  embedded: boolean;
  variant: "default" | "muted";
  id?: string;
  children: ReactNode;
}) {
  if (embedded) {
    return (
      <div
        id={id}
        className={`py-8 border-t border-border ${variant === "muted" ? "rounded-xl bg-surface px-5 sm:px-6 -mx-1" : ""}`}
      >
        {children}
      </div>
    );
  }

  return (
    <Section id={id} variant={variant}>
      {children}
    </Section>
  );
}

/** Long-form scroll layout with alternating text + project imagery. */
export function ContentSections({
  content,
  introClassName = "",
  galleryImages = [],
  embedded = false,
}: ContentSectionsProps) {
  return (
    <div className={embedded ? "long-form-content-embedded" : "long-form-content"}>
      {content.intro && (
        embedded ? (
          <p className={`text-text-muted leading-relaxed ${introClassName}`}>{content.intro}</p>
        ) : (
          <Section>
            <p className={`text-lg text-text-muted leading-relaxed max-w-3xl ${introClassName}`}>
              {content.intro}
            </p>
          </Section>
        )
      )}

      {content.sections.map((section, index) => {
        const image = sectionImage(galleryImages, index);
        const showSideImage = image != null && index % 2 === 0;
        const showGalleryRow =
          !embedded && galleryImages.length > 0 && index > 0 && index % 5 === 0;

        return (
          <div key={`${section.id}-${index}`}>
            <SectionBlock
              embedded={embedded}
              id={section.id}
              variant={index % 2 === 1 ? "muted" : "default"}
            >
              {showSideImage ? (
                <div className={`grid items-start gap-6 ${embedded ? "md:grid-cols-5" : "lg:grid-cols-2 lg:gap-12 items-center"}`}>
                  <div className={embedded ? "md:col-span-3 min-w-0" : ""}>
                    {section.heading && (
                      <Heading level={2} className={`text-primary mb-4 ${embedded ? "text-lg" : "mb-6"}`}>
                        {section.heading}
                      </Heading>
                    )}
                    <div className="prose-section text-text-muted space-y-3">
                      {section.paragraphs.map((paragraph, pIndex) => (
                        <p key={pIndex} className="leading-relaxed max-w-none text-sm sm:text-base">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                  <figure className={`overflow-hidden rounded-xl border border-border bg-white shadow-sm ${embedded ? "md:col-span-2" : ""}`}>
                    <div className="relative aspect-[4/3] bg-surface-alt">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes={embedded ? "(max-width: 768px) 100vw, 25vw" : "(max-width: 1024px) 100vw, 50vw"}
                        unoptimized
                      />
                    </div>
                    <figcaption className="px-3 py-2 text-[11px] text-text-muted border-t border-border line-clamp-2">
                      {image.alt}
                    </figcaption>
                  </figure>
                </div>
              ) : (
                <>
                  {section.heading && (
                    <Heading level={2} className={`text-primary mb-4 ${embedded ? "text-lg" : "mb-6"}`}>
                      {section.heading}
                    </Heading>
                  )}
                  <div className={`prose-section text-text-muted space-y-3 ${embedded ? "" : "max-w-3xl"}`}>
                    {section.paragraphs.map((paragraph, pIndex) => (
                      <p key={pIndex} className="leading-relaxed text-sm sm:text-base">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </>
              )}
            </SectionBlock>

            {showGalleryRow && (
              <Section variant="muted">
                <Heading level={3} className="text-primary mb-6 text-center">
                  Recent Installations
                </Heading>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {galleryImages.slice(0, 3).map((img, imgIdx) => (
                    <figure
                      key={`${section.id}-gallery-${imgIdx}`}
                      className="group overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          unoptimized
                        />
                      </div>
                      <figcaption className="px-3 py-2.5 text-xs text-text-muted">
                        {img.alt}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </Section>
            )}
          </div>
        );
      })}
    </div>
  );
}
