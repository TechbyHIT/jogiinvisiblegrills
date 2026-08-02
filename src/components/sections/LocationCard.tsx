import Link from "next/link";
import type { LocationRecord } from "@/types";
import { locationPath } from "@/config/routes";

type LocationCardProps = {
  location: LocationRecord;
};

export function LocationCard({ location }: LocationCardProps) {
  return (
    <Link
      href={locationPath(location.slug)}
      className="group block rounded-lg border border-border bg-white p-5 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <h3 className="font-display text-lg font-semibold text-primary group-hover:text-accent transition-colors">
        {location.name}
      </h3>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-text-muted">
        {location.locationType} &middot; {location.state}
      </p>
      <p className="mt-3 text-sm text-text-muted line-clamp-3">
        {location.introduction}
      </p>
      <span className="mt-4 inline-block text-sm font-semibold text-accent">
        View services &rarr;
      </span>
    </Link>
  );
}
