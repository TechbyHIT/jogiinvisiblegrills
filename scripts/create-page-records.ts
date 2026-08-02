import type { PageType } from "../src/types";
import { getAllPages, getPagesByType } from "../src/lib/pages/registry";
import { parseCliArgs, writeReport } from "./lib/report-utils";

const args = parseCliArgs(process.argv.slice(2));
const pageType = args.type as PageType | undefined;
const limit = Number.parseInt(args.limit ?? "1000", 10);

const sourcePages = pageType ? getPagesByType(pageType) : getAllPages();
const selected = sourcePages.slice(0, Number.isFinite(limit) ? limit : 1000);

const records = selected.map((page) => ({
  id: page.id,
  path: page.path,
  slug: page.slug,
  pageType: page.pageType,
  title: page.title,
  publicationStatus: page.publicationStatus,
  allowIndexing: page.allowIndexing,
  qualityScore: page.qualityScore,
  wordCount: page.wordCount,
  minimumRequiredWordCount: page.minimumRequiredWordCount,
  createdAt: page.createdAt,
  updatedAt: page.updatedAt,
}));

const report = {
  generatedAt: new Date().toISOString(),
  options: {
    type: pageType ?? "all",
    limit,
  },
  totals: {
    available: sourcePages.length,
    exported: records.length,
  },
  records,
};

const filePath = writeReport("create-page-records.json", report);

console.log("Create Page Records Summary");
console.log("===========================");
console.log(`Type filter: ${report.options.type}`);
console.log(`Limit: ${report.options.limit}`);
console.log(`Available: ${report.totals.available}`);
console.log(`Exported: ${report.totals.exported}`);
console.log(`Report: ${filePath}`);
