import { getPublishedPages } from "../src/lib/pages/registry";
import { isPageIndexable } from "../src/lib/seo/is-page-indexable";
import { parseCliArgs, writeReport } from "./lib/report-utils";

const args = parseCliArgs(process.argv.slice(2));
const batchSize = Number.parseInt(args["batch-size"] ?? "500", 10);

const candidates = getPublishedPages().filter((page) => isPageIndexable(page));
const batches: Array<{
  batchNumber: number;
  count: number;
  paths: string[];
}> = [];

for (let i = 0; i < candidates.length; i += batchSize) {
  const batch = candidates.slice(i, i + batchSize);
  batches.push({
    batchNumber: batches.length + 1,
    count: batch.length,
    paths: batch.map((page) => page.path),
  });
}

const report = {
  generatedAt: new Date().toISOString(),
  batchSize,
  totals: {
    indexableCandidates: candidates.length,
    batchCount: batches.length,
  },
  batches,
};

const filePath = writeReport("publish-pages.json", report);

console.log("Publish Pages Summary");
console.log("=====================");
console.log(`Indexable candidates: ${report.totals.indexableCandidates}`);
console.log(`Batch size: ${batchSize}`);
console.log(`Batches: ${report.totals.batchCount}`);
console.log(`Report: ${filePath}`);
