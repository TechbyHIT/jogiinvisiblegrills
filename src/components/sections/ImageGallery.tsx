import Image from "next/image";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

type ImageGalleryProps = {
  images: readonly GalleryImage[];
  title?: string;
  columns?: 2 | 3 | 4;
  variant?: "default" | "muted";
};

export function ImageGallery({
  images,
  title = "Installation Gallery",
  columns = 3,
  variant = "default",
}: ImageGalleryProps) {
  if (images.length === 0) return null;

  const gridClass =
    columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : columns === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <Section variant={variant === "muted" ? "muted" : "default"}>
      <Heading level={2} className="text-primary mb-6">
        {title}
      </Heading>
      <div className={`grid gap-4 ${gridClass}`}>
        {images.map((image, index) => (
          <figure
            key={`${image.src}-${index}`}
            className="overflow-hidden rounded-lg border border-border bg-white"
          >
            <div className="relative aspect-[4/3] bg-surface-alt">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
              />
            </div>
            {image.caption && (
              <figcaption className="p-3 text-sm font-medium text-primary">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </Section>
  );
}
