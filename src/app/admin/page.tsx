import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated, setAdminCookie, clearAdminCookie } from "@/lib/admin/auth";
import { paginatePages, getAllPages } from "@/lib/pages/registry";
import { getPublishedServices } from "@/data/initial-services";
import { getPublishedLocations } from "@/data/initial-locations";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

export const dynamic = "force-dynamic";

async function loginAction(formData: FormData) {
  "use server";
  const password = formData.get("password") as string;
  const ok = await setAdminCookie(password);
  if (!ok) return;
  redirect("/admin/");
}

async function logoutAction() {
  "use server";
  await clearAdminCookie();
  redirect("/admin/");
}

type AdminPageProps = {
  searchParams: Promise<{ cursor?: string }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const authenticated = await isAdminAuthenticated();
  const { cursor: cursorParam } = await searchParams;
  const cursor = Number(cursorParam ?? "0") || 0;

  if (!authenticated) {
    return (
      <Container className="py-24 max-w-md">
        <Heading level={1} className="text-primary mb-6">Admin Login</Heading>
        <form action={loginAction} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-primary"
            />
          </div>
          <button type="submit" className="rounded-md bg-primary px-6 py-2.5 text-white font-semibold hover:bg-primary-dark">
            Login
          </button>
        </form>
      </Container>
    );
  }

  const { items, nextCursor, total } = paginatePages(cursor, 25);
  const allPages = getAllPages();

  return (
    <Container className="py-12">
      <div className="flex items-center justify-between mb-8">
        <Heading level={1} className="text-primary">Admin Dashboard</Heading>
        <form action={logoutAction}>
          <button type="submit" className="text-sm text-text-muted hover:text-accent">Logout</button>
        </form>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        <StatCard label="Total Pages" value={total} />
        <StatCard label="Services" value={getPublishedServices().length} />
        <StatCard label="Locations" value={getPublishedLocations().length} />
        <StatCard label="Published" value={allPages.filter((p) => p.publicationStatus === "published").length} />
      </div>

      <nav className="flex flex-wrap gap-3 mb-8">
        {[
          { href: "/admin/services/", label: "Services" },
          { href: "/admin/locations/", label: "Locations" },
          { href: "/admin/pages/", label: "Pages" },
          { href: "/admin/publishing/", label: "Publishing" },
          { href: "/admin/audits/", label: "Audits" },
        ].map((link) => (
          <Link key={link.href} href={link.href} className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:border-primary">
            {link.label}
          </Link>
        ))}
      </nav>

      <Heading level={2} className="text-primary mb-4">Page Registry</Heading>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="min-w-full text-sm">
          <thead className="bg-surface-alt">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Path</th>
              <th className="px-4 py-3 text-left font-semibold">Type</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-left font-semibold">Quality</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((page) => (
              <tr key={page.id}>
                <td className="px-4 py-2 font-mono text-xs">{page.path}</td>
                <td className="px-4 py-2">{page.pageType}</td>
                <td className="px-4 py-2">{page.publicationStatus}</td>
                <td className="px-4 py-2">{page.qualityScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex gap-4">
        {cursor > 0 && (
          <Link href={`/admin/?cursor=${Math.max(0, cursor - 25)}`} className="text-sm text-primary hover:text-accent">
            &larr; Previous
          </Link>
        )}
        {nextCursor !== null && (
          <Link href={`/admin/?cursor=${nextCursor}`} className="text-sm text-primary hover:text-accent">
            Next &rarr;
          </Link>
        )}
      </div>
    </Container>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <p className="text-sm text-text-muted">{label}</p>
      <p className="mt-1 text-2xl font-bold text-primary">{value}</p>
    </div>
  );
}
