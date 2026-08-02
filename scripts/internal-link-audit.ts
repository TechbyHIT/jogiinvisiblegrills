import { getPublishedPages } from "../src/lib/pages/registry";
import { generateInternalLinks } from "../src/lib/internal-links/generate-internal-links";
import { writeReport } from "./lib/report-utils";

const pages = getPublishedPages();

const results = pages.map((page) => {
  const links = generateInternalLinks(page);
  return {
    path: page.path,
    pageType: page.pageType,
    linkCount: links.length,
    hasInternalLinksFlag: page.hasInternalLinks,
    links: links.map((link) => ({ href: link.href, label: link.label })),
  };
});

const missingLinks = results.filter((item) => item.linkCount === 0);
const flagMismatch = results.filter(
  (item) => item.hasInternalLinksFlag !== item.linkCount > 0,
);

const report = {
  generatedAt: new Date().toISOString(),
  totals: {
    pages: pages.length,
    averageLinks:
      results.reduce((sum, item) => sum + item.linkCount, 0) / Math.max(pages.length, 1),
    missingLinks: missingLinks.length,
    flagMismatch: flagMismatch.length,
  },
  missingLinks,
  flagMismatch,
  results,
};

const filePath = writeReport("internal-link-audit.json", report);

console.log("Internal Link Audit Summary");
console.log("===========================");
console.log(`Pages analysed: ${report.totals.pages}`);
console.log(`Average links per page: ${report.totals.averageLinks.toFixed(1)}`);
console.log(`Pages with zero links: ${report.totals.missingLinks}`);
console.log(`Flag mismatches: ${report.totals.flagMismatch}`);
console.log(`Report: ${filePath}`);
