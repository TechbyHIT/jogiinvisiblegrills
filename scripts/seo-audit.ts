import { getAllPages, getIndexablePages, getPublishedPages } from "../src/lib/pages/registry";
import { isPageIndexable } from "../src/lib/seo/is-page-indexable";
import { parseCliArgs, writeReport } from "./lib/report-utils";

const args = parseCliArgs(process.argv.slice(2));

const pages = getAllPages();
const published = getPublishedPages();
const indexable = getIndexablePages();

const byType = pages.reduce<Record<string, number>>((acc, page) => {
  acc[page.pageType] = (acc[page.pageType] ?? 0) + 1;
  return acc;
}, {});

const indexableByType = indexable.reduce<Record<string, number>>((acc, page) => {
  acc[page.pageType] = (acc[page.pageType] ?? 0) + 1;
  return acc;
}, {});

const failingPages = published
  .filter((page) => !isPageIndexable(page))
  .map((page) => ({
    path: page.path,
    pageType: page.pageType,
    qualityScore: page.qualityScore,
    wordCount: page.wordCount,
    minimumRequiredWordCount: page.minimumRequiredWordCount,
    similarityScore: page.similarityScore,
    reasons: {
      publicationStatus: page.publicationStatus !== "published",
      allowIndexing: !page.allowIndexing,
      qualityScore: page.qualityScore < 80,
      contentReviewed: !page.contentReviewed,
      localDataVerified: !page.localDataVerified,
      hasUniqueMetadata: !page.hasUniqueMetadata,
      hasUniqueContent: !page.hasUniqueContent,
      hasValidCanonical: !page.hasValidCanonical,
      hasInternalLinks: !page.hasInternalLinks,
      hasValidSchema: !page.hasValidSchema,
      wordCount: page.wordCount < page.minimumRequiredWordCount,
      similarityScore: page.similarityScore > 0.7,
    },
  }));

const report = {
  generatedAt: new Date().toISOString(),
  filter: args,
  totals: {
    all: pages.length,
    published: published.length,
    indexable: indexable.length,
  },
  byType,
  indexableByType,
  failingPages,
};

const filePath = writeReport("seo-audit.json", report);

console.log("SEO Audit Summary");
console.log("=================");
console.log(`Total pages: ${report.totals.all}`);
console.log(`Published: ${report.totals.published}`);
console.log(`Indexable: ${report.totals.indexable}`);
console.log(`Non-indexable published: ${failingPages.length}`);
console.log(`Report: ${filePath}`);
