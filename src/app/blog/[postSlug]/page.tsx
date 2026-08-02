import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPath } from "@/config/routes";
import { getBlogPostBySlug, getPublishedBlogPosts } from "@/data/blog-posts";
import { getPublishedPageByPath } from "@/lib/pages/get-published-page";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import { assembleBlogPageContent } from "@/lib/content/assemble-page-content";
import { generateInternalLinks } from "@/lib/internal-links/generate-internal-links";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContentSections } from "@/components/sections/ContentSections";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildArticleSchema } from "@/lib/schema/article";
import { absoluteUrl } from "@/lib/pages/page-helpers";

export const revalidate = 86400;
export const dynamicParams = true;

type PageProps = { params: Promise<{ postSlug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { postSlug } = await params;
  const page = getPublishedPageByPath(blogPath(postSlug));
  if (!page) return {};
  return generatePageMetadata(page);
}

export function generateStaticParams() {
  return getPublishedBlogPosts().map((p) => ({ postSlug: p.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { postSlug } = await params;
  const post = getBlogPostBySlug(postSlug);
  if (!post || post.publicationStatus !== "published") notFound();

  const page = getPublishedPageByPath(blogPath(post.slug));
  if (!page) notFound();

  const content = assembleBlogPageContent(post);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog/" },
    { name: post.title, href: blogPath(post.slug) },
  ];
  const pageUrl = absoluteUrl(blogPath(post.slug));

  return (
    <>
      <JsonLd data={buildArticleSchema({ title: post.title, description: post.summary, url: pageUrl, datePublished: post.publishedAt, dateModified: post.updatedAt, author: post.author })} />
      <Hero title={post.title} subtitle={post.summary} />
      <Section>
        <Breadcrumbs items={breadcrumbs} />
      </Section>
      <ContentSections content={content} />
      {post.faqs.length > 0 && (
        <Section variant="muted">
          <h2 className="font-display text-2xl font-semibold text-primary mb-6">Related Questions</h2>
          <div className="max-w-3xl">
            <FAQAccordion items={post.faqs} />
          </div>
        </Section>
      )}
      <Section>
        <div className="max-w-md">
          <RelatedLinks links={generateInternalLinks(page)} />
        </div>
      </Section>
      <CTABanner />
    </>
  );
}
