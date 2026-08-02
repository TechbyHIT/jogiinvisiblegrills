import Image from "next/image";
import Link from "next/link";
import type { ServiceRecord } from "@/types";
import { servicePath } from "@/config/routes";
import { getHeroForService } from "@/config/finalized-images";

type ServiceCardProps = {
  service: ServiceRecord;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const heroSrc = getHeroForService(service.slug, service.slug);

  return (
    <Link
      href={servicePath(service.slug)}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-white transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-alt">
        <Image
          src={heroSrc}
          alt={`${service.name} — real installation project photo`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-primary group-hover:text-accent transition-colors">
          {service.shortName}
        </h3>
        <p className="mt-2 text-sm text-text-muted line-clamp-3 flex-1">{service.summary}</p>
        <span className="mt-4 text-sm font-semibold text-accent">Learn more &rarr;</span>
      </div>
    </Link>
  );
}
