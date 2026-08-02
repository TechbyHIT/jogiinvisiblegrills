import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getAllPages } from "@/lib/pages/registry";
import { SITE_CONFIG } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

export const dynamic = "force-dynamic";

export default async function AdminAuditsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/");

  const pages = getAllPages();
  const lowQuality = pages.filter((p) => p.qualityScore < SITE_CONFIG.minimumQualityScore);
  const lowWordCount = pages.filter((p) => p.wordCount < p.minimumRequiredWordCount);
  const highSimilarity = pages.filter((p) => p.similarityScore > SITE_CONFIG.maximumSimilarityScore);

  return (
    <Container className="py-12">
      <Link href="/admin/" className="text-sm text-primary hover:text-accent">&larr; Dashboard</Link>
      <Heading level={1} className="text-primary mt-4 mb-6">Content Audits</Heading>
      <div className="grid gap-6 md:grid-cols-3">
        <AuditList title={`Low Quality (<${SITE_CONFIG.minimumQualityScore})`} pages={lowQuality} />
        <AuditList title="Below Min Word Count" pages={lowWordCount} />
        <AuditList title={`High Similarity (>${SITE_CONFIG.maximumSimilarityScore})`} pages={highSimilarity} />
      </div>
    </Container>
  );
}

function AuditList({ title, pages }: { title: string; pages: Array<{ id: string; path: string }> }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <h2 className="font-semibold text-primary mb-2">{title}</h2>
      <p className="text-sm text-text-muted mb-3">{pages.length} pages</p>
      <ul className="text-xs font-mono space-y-1 max-h-64 overflow-y-auto">
        {pages.slice(0, 30).map((page) => (
          <li key={page.id}>{page.path}</li>
        ))}
      </ul>
    </div>
  );
}
