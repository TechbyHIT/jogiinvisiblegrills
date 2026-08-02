import { getAllPages } from "../src/lib/pages/registry";
import { SITE_CONFIG } from "../src/config/site";
import { writeReport } from "./lib/report-utils";

const pages = getAllPages();
const threshold = SITE_CONFIG.maximumSimilarityScore;

const duplicates = pages
  .filter((page) => page.similarityScore > threshold)
  .sort((a, b) => b.similarityScore - a.similarityScore)
  .map((page) => ({
    path: page.path,
    pageType: page.pageType,
    similarityScore: page.similarityScore,
    hasUniqueContent: page.hasUniqueContent,
  }));

const highSimilarity = pages
  .filter((page) => page.similarityScore > 0.5 && page.similarityScore <= threshold)
  .sort((a, b) => b.similarityScore - a.similarityScore)
  .slice(0, 50)
  .map((page) => ({
    path: page.path,
    pageType: page.pageType,
    similarityScore: page.similarityScore,
  }));

const report = {
  generatedAt: new Date().toISOString(),
  threshold,
  totals: {
    pages: pages.length,
    aboveThreshold: duplicates.length,
    warningBand: highSimilarity.length,
  },
  duplicates,
  highSimilarity,
};

const filePath = writeReport("duplicate-audit.json", report);

console.log("Duplicate Audit Summary");
console.log("=======================");
console.log(`Pages analysed: ${report.totals.pages}`);
console.log(`Above similarity threshold (${threshold}): ${report.totals.aboveThreshold}`);
console.log(`Warning band (0.5–${threshold}): ${report.totals.warningBand}`);
console.log(`Report: ${filePath}`);
