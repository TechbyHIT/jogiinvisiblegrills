import Link from "next/link";
import type { AreaRecord, LocationRecord } from "@/types";
import { areaPath, locationPath } from "@/config/routes";

type CityAreaGridProps = {
  location: LocationRecord;
  areas: AreaRecord[];
  showCityHubLink?: boolean;
};

export function CityAreaGrid({ location, areas, showCityHubLink = true }: CityAreaGridProps) {
  if (areas.length === 0) return null;

  return (
    <section className="rounded-xl border border-border bg-surface-alt/60 p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <svg
          className="h-5 w-5 text-gold shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="font-display text-xl font-bold text-primary md:text-2xl">{location.name}</h2>
        {showCityHubLink && (
          <Link
            href={locationPath(location.slug)}
            className="text-sm font-medium text-gold hover:underline"
          >
            View city hub &rarr;
          </Link>
        )}
        <span className="ml-auto text-xs font-medium uppercase tracking-wide text-text-muted">
          {areas.length} localities
        </span>
      </div>

      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {areas.map((area) => (
          <li key={area.id}>
            <Link
              href={areaPath(location.slug, area.slug)}
              className="block rounded-md border border-border bg-white px-3 py-2.5 text-sm font-medium text-text hover:border-gold hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {area.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
