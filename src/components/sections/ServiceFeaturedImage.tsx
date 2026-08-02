import Image from "next/image";

type ServiceFeaturedImageProps = {
  src: string;
  alt: string;
  locationLabel: string;
  serviceName: string;
};

/** Primary project photo — full-width in the main content column. */
export function ServiceFeaturedImage({
  src,
  alt,
  locationLabel,
  serviceName,
}: ServiceFeaturedImageProps) {
  return (
    <figure className="mt-8 overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <div className="relative aspect-[16/10] bg-surface-alt">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
          priority
          quality={90}
          unoptimized
        />
      </div>
      <figcaption className="px-4 py-3 text-xs text-text-muted border-t border-border">
        {serviceName} installation in {locationLabel} — real project photo
      </figcaption>
    </figure>
  );
}
