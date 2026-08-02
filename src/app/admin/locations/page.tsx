import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getPublishedLocations } from "@/data/initial-locations";
import { getPublishedAreas } from "@/data/initial-areas";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

export const dynamic = "force-dynamic";

export default async function AdminLocationsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/");

  const locations = getPublishedLocations();
  const areas = getPublishedAreas();

  return (
    <Container className="py-12">
      <Link href="/admin/" className="text-sm text-primary hover:text-accent">&larr; Dashboard</Link>
      <Heading level={1} className="text-primary mt-4 mb-6">Locations</Heading>
      <ul className="divide-y divide-border rounded-lg border border-border mb-8">
        {locations.map((loc) => (
          <li key={loc.id} className="px-4 py-3 flex justify-between gap-4">
            <span className="font-medium">{loc.name}</span>
            <span className="text-sm text-text-muted">{loc.slug} &middot; {loc.locationType}</span>
          </li>
        ))}
      </ul>
      <Heading level={2} className="text-primary mb-4">Areas ({areas.length})</Heading>
      <ul className="divide-y divide-border rounded-lg border border-border">
        {areas.map((area) => (
          <li key={area.id} className="px-4 py-3 text-sm">
            {area.name} <span className="text-text-muted">({area.slug})</span>
          </li>
        ))}
      </ul>
    </Container>
  );
}
