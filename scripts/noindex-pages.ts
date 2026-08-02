import { getPublishedPages } from "../src/lib/pages/registry";
import { parseCliArgs, writeReport } from "./lib/report-utils";

const args = parseCliArgs(process.argv.slice(2));
const qualityBelow = Number.parseInt(args["quality-below"] ?? "80", 10);

const pages = getPublishedPages().filter((page) => page.qualityScore < qualityBelow);

const report = {
  generatedAt: new Date().toISOString(),
  qualityBelow,
  totals: {
    published: getPublishedPages().length,
    markedNoindex: pages.length,
  },
  pages: pages.map((page) => ({
    path: page.path,
    pageType: page.pageType,
    qualityScore: page.qualityScore,
    wordCount: page.wordCount,
    minimumRequiredWordCount: page.minimumRequiredWordCount,
    suggestedAction: "set publicationStatus=noindex or improve content",
  })),
};

const filePath = writeReport("noindex-pages.json", report);

console.log("Noindex Pages Summary");
console.log("=====================");
console.log(`Quality threshold: below ${qualityBelow}`);
console.log(`Pages suggested for noindex: ${report.totals.markedNoindex}`);
console.log(`Report: ${filePath}`);
