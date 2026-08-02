import {
  getAllPages,
  getIndexablePages,
  getPublishedPages,
} from "../src/lib/pages/registry";
import { writeReport } from "./lib/report-utils";

const allPages = getAllPages();
const published = getPublishedPages();
const indexable = getIndexablePages();

const byType = allPages.reduce<Record<string, { total: number; published: number; indexable: number }>>(
  (acc, page) => {
    if (!acc[page.pageType]) {
      acc[page.pageType] = { total: 0, published: 0, indexable: 0 };
    }
    acc[page.pageType].total += 1;
    return acc;
  },
  {},
);

for (const page of published) {
  byType[page.pageType].published += 1;
}

for (const page of indexable) {
  byType[page.pageType].indexable += 1;
}

const report = {
  generatedAt: new Date().toISOString(),
  totals: {
    all: allPages.length,
    published: published.length,
    indexable: indexable.length,
  },
  byType,
};

const filePath = writeReport("page-count.json", report);

console.log("Page Count Summary");
console.log("==================");
console.log(`All pages: ${report.totals.all}`);
console.log(`Published: ${report.totals.published}`);
console.log(`Indexable: ${report.totals.indexable}`);
console.log("By type:");
for (const [type, counts] of Object.entries(byType)) {
  console.log(`  ${type}: ${counts.indexable}/${counts.published}/${counts.total} (indexable/published/total)`);
}
console.log(`Report: ${filePath}`);
