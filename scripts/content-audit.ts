import { getAllPages } from "../src/lib/pages/registry";
import { writeReport } from "./lib/report-utils";

const pages = getAllPages();

const lowWordCount = pages.filter(
  (page) => page.wordCount < page.minimumRequiredWordCount,
);

const lowQuality = pages.filter((page) => page.qualityScore < 80);

const unreviewed = pages.filter((page) => !page.contentReviewed);

const report = {
  generatedAt: new Date().toISOString(),
  totals: {
    pages: pages.length,
    lowWordCount: lowWordCount.length,
    lowQuality: lowQuality.length,
    unreviewed: unreviewed.length,
  },
  lowWordCount: lowWordCount.map((page) => ({
    path: page.path,
    pageType: page.pageType,
    wordCount: page.wordCount,
    minimumRequiredWordCount: page.minimumRequiredWordCount,
    deficit: page.minimumRequiredWordCount - page.wordCount,
  })),
  lowQuality: lowQuality.map((page) => ({
    path: page.path,
    pageType: page.pageType,
    qualityScore: page.qualityScore,
  })),
  unreviewed: unreviewed.map((page) => ({
    path: page.path,
    pageType: page.pageType,
  })),
};

const filePath = writeReport("content-audit.json", report);

console.log("Content Audit Summary");
console.log("=====================");
console.log(`Pages analysed: ${report.totals.pages}`);
console.log(`Below word count target: ${report.totals.lowWordCount}`);
console.log(`Below quality score 80: ${report.totals.lowQuality}`);
console.log(`Not content reviewed: ${report.totals.unreviewed}`);
console.log(`Report: ${filePath}`);
