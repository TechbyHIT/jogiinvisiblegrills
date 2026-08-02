import { getPublishedPages } from "../src/lib/pages/registry";
import { writeReport } from "./lib/report-utils";

const pages = getPublishedPages();

const results = pages.map((page) => ({
  path: page.path,
  pageType: page.pageType,
  hasValidSchema: page.hasValidSchema,
  canonicalUrl: page.canonicalUrl,
  title: page.title,
  metaDescription: page.metaDescription,
}));

const invalidSchema = results.filter((item) => !item.hasValidSchema);
const missingMetadata = results.filter(
  (item) => !item.title.trim() || !item.metaDescription.trim(),
);

const report = {
  generatedAt: new Date().toISOString(),
  totals: {
    pages: pages.length,
    validSchema: results.filter((item) => item.hasValidSchema).length,
    invalidSchema: invalidSchema.length,
    missingMetadata: missingMetadata.length,
  },
  invalidSchema,
  missingMetadata,
  results,
};

const filePath = writeReport("schema-audit.json", report);

console.log("Schema Audit Summary");
console.log("====================");
console.log(`Pages analysed: ${report.totals.pages}`);
console.log(`Valid schema flag: ${report.totals.validSchema}`);
console.log(`Invalid schema flag: ${report.totals.invalidSchema}`);
console.log(`Missing title/description: ${report.totals.missingMetadata}`);
console.log(`Report: ${filePath}`);
