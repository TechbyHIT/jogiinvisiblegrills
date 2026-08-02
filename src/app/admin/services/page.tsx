import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getPublishedServices } from "@/data/initial-services";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/");

  const services = getPublishedServices();

  return (
    <Container className="py-12">
      <Link href="/admin/" className="text-sm text-primary hover:text-accent">&larr; Dashboard</Link>
      <Heading level={1} className="text-primary mt-4 mb-6">Services</Heading>
      <ul className="divide-y divide-border rounded-lg border border-border">
        {services.map((service) => (
          <li key={service.id} className="px-4 py-3 flex justify-between gap-4">
            <span className="font-medium">{service.name}</span>
            <span className="text-sm text-text-muted">{service.slug} &middot; Q{service.qualityScore}</span>
          </li>
        ))}
      </ul>
    </Container>
  );
}
