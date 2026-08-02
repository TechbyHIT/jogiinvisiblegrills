import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getAllPages } from "@/lib/pages/registry";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

export const dynamic = "force-dynamic";

export default async function AdminPagesPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/");

  const pages = getAllPages();

  return (
    <Container className="py-12">
      <Link href="/admin/" className="text-sm text-primary hover:text-accent">&larr; Dashboard</Link>
      <Heading level={1} className="text-primary mt-4 mb-2">All Pages</Heading>
      <p className="text-text-muted mb-6">{pages.length} total pages in registry</p>
      <div className="overflow-x-auto rounded-lg border border-border max-h-[70vh] overflow-y-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-surface-alt sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left">Path</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">H1</th>
              <th className="px-4 py-3 text-left">Words</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {pages.map((page) => (
              <tr key={page.id}>
                <td className="px-4 py-2 font-mono text-xs">{page.path}</td>
                <td className="px-4 py-2">{page.pageType}</td>
                <td className="px-4 py-2 max-w-xs truncate">{page.h1}</td>
                <td className="px-4 py-2">{page.wordCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
