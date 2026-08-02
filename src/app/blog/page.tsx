import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { getPublishedBlogPosts } from "@/data/blog-posts";
import { blogPath } from "@/config/routes";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { CTABanner } from "@/components/sections/CTABanner";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const page = getPublishedPageByPath("/blog/");
  return page ? generatePageMetadata(page) : { title: "Blog" };
}

export default function BlogPage() {
  const posts = getPublishedBlogPosts();

  return (
    <>
      <Hero title="Blog" subtitle="Tips, comparisons and local insights on home safety installations." />
      <Section>
        <Heading level={2} className="text-primary mb-8">Latest Posts</Heading>
        <ul className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={blogPath(post.slug)} className="block rounded-lg border border-border p-5 hover:border-accent transition-colors h-full">
                <p className="text-xs font-medium uppercase tracking-wide text-accent">{post.category}</p>
                <h3 className="mt-2 font-display font-semibold text-primary">{post.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{post.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CTABanner />
    </>
  );
}
