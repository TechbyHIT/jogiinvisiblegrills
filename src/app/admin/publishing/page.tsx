import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getAllPages } from "@/lib/pages/registry";
import { isPageIndexable } from "@/lib/seo/is-page-indexable";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

export const dynamic = "force-dynamic";

export default async function AdminPublishingPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/");

  const pages = getAllPages();
  const byStatus = pages.reduce<Record<string, number>>((acc, page) => {
    acc[page.publicationStatus] = (acc[page.publicationStatus] ?? 0) + 1;
    return acc;
  }, {});

  const notIndexable = pages.filter((p) => !isPageIndexable(p));

  return (
    <Container className="py-12">
      <Link href="/admin/" className="text-sm text-primary hover:text-accent">&larr; Dashboard</Link>
      <Heading level={1} className="text-primary mt-4 mb-6">Publishing Status</Heading>
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        {Object.entries(byStatus).map(([status, count]) => (
          <div key={status} className="rounded-lg border border-border p-4">
            <p className="text-sm text-text-muted capitalize">{status}</p>
            <p className="text-2xl font-bold text-primary">{count}</p>
          </div>
        ))}
      </div>
      <Heading level={2} className="text-primary mb-4">Not Indexable ({notIndexable.length})</Heading>
      <ul className="divide-y divide-border rounded-lg border border-border max-h-96 overflow-y-auto">
        {notIndexable.slice(0, 50).map((page) => (
          <li key={page.id} className="px-4 py-2 text-sm font-mono">{page.path}</li>
        ))}
      </ul>
    </Container>
  );
}
