import { getIndexablePages } from "../src/lib/pages/registry";
import { SITEMAP_GROUPS } from "../src/lib/sitemap/groups";
import { writeReport } from "./lib/report-utils";

const indexablePages = getIndexablePages();

const groups = SITEMAP_GROUPS.map((group) => {
  const pages = indexablePages.filter((page) => group.pageTypes.includes(page.pageType));
  return {
    id: group.id,
    label: group.label,
    changefreq: group.changefreq,
    priority: group.priority,
    urlCount: pages.length,
    samplePaths: pages.slice(0, 5).map((page) => page.path),
  };
});

const report = {
  generatedAt: new Date().toISOString(),
  totals: {
    indexableUrls: indexablePages.length,
    groupCount: groups.length,
  },
  groups,
  paths: indexablePages.map((page) => ({
    path: page.path,
    pageType: page.pageType,
    lastModified: page.lastContentChangeAt ?? page.updatedAt,
  })),
};

const filePath = writeReport("sitemap-summary.json", report);

console.log("Sitemap Generation Summary");
console.log("==========================");
console.log(`Indexable URLs: ${report.totals.indexableUrls}`);
console.log(`Sitemap groups: ${report.totals.groupCount}`);
for (const group of groups) {
  console.log(`  ${group.id}: ${group.urlCount} URLs`);
}
console.log(`Report: ${filePath}`);
