import Image from "next/image";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import type { GalleryImage } from "@/config/finalized-images";

type InstallationGalleryProps = {
  images: GalleryImage[];
  title?: string;
  subtitle?: string;
  maxImages?: number;
  /** full = homepage section; inline = compact grid inside service page main column */
  layout?: "full" | "inline";
};

function GalleryHeader({
  title,
  subtitle,
  compact,
}: {
  title: string;
  subtitle: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "mb-5" : "mb-8 max-w-3xl"}>
      <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Our work</p>
      <Heading level={2} className={`text-primary mb-2 ${compact ? "text-xl" : "mb-3"}`}>
        {title}
      </Heading>
      <p className="text-sm text-text-muted leading-relaxed">{subtitle}</p>
    </div>
  );
}

/** Deva / Featherguard-style photo grid — real HD project installs. */
export function InstallationGallery({
  images,
  title = "Installation Gallery",
  subtitle = "Real HD project photos from balconies, windows, terraces and commercial sites across Bengaluru & Mysuru.",
  maxImages = 12,
  layout = "full",
}: InstallationGalleryProps) {
  if (images.length === 0) return null;

  const featured = images.slice(0, maxImages);

  if (layout === "inline") {
    return (
      <div className="mt-10">
        <GalleryHeader title={title} subtitle={subtitle} compact />
        <div className="grid grid-cols-2 gap-3">
          {featured.map((image, index) => (
            <figure
              key={`${image.src}-${index}`}
              className="group overflow-hidden rounded-lg border border-border bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3] bg-surface-alt">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  priority={index < 2}
                  quality={85}
                  unoptimized
                />
              </div>
              <figcaption className="px-2.5 py-2 text-[10px] leading-snug text-text-muted border-t border-border line-clamp-2">
                {image.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Section variant="muted">
      <GalleryHeader title={title} subtitle={subtitle} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {featured.map((image, index) => (
          <figure
            key={`${image.src}-${index}`}
            className="group overflow-hidden rounded-xl border border-border bg-white shadow-sm"
          >
            <div className="relative aspect-[4/3] bg-surface-alt">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={index < 4}
                quality={90}
                unoptimized
              />
            </div>
            <figcaption className="px-3 py-2 text-[11px] leading-snug text-text-muted border-t border-border line-clamp-2">
              {image.alt}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
