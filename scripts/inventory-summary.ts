import { computeProgrammaticInventory } from "../src/lib/pages/programmatic-inventory";
import { getIndexablePages } from "../src/lib/pages/registry";
import { writeReport } from "./lib/report-utils";

const inventory = computeProgrammaticInventory();
const legacyIndexable = getIndexablePages().length;

const report = {
  generatedAt: new Date().toISOString(),
  ...inventory,
  legacyIndexablePages: legacyIndexable,
  formula: {
    layer1: "/{service}",
    layer2: "/{service}-{city|area}",
    layer3: "/{service}-{city|area}-{intent}",
  },
};

const filePath = writeReport("inventory-summary.json", report);

console.log("Programmatic SEO Inventory (flat URL model)");
console.log("=============================================");
console.log(`Cities: ${inventory.cities}`);
console.log(
  `Areas: ${inventory.areas} (${inventory.areasByCity.map((c) => `${c.count} ${c.city}`).join(" + ")})`,
);
console.log(`Services: ${inventory.services}`);
console.log(`Categories: ${inventory.categories}`);
console.log(
  `Keywords / intents: ${inventory.keywordsIntents} (${inventory.indexableIntents} indexable)`,
);
console.log(`Locations: ${inventory.locations} (${inventory.cities} cities + ${inventory.areas} areas)`);
console.log("");
console.log("Page formula:");
console.log(`  1. /{service}                          → ${inventory.layer1ServiceUrls.toLocaleString()}`);
console.log(
  `  2. /{service}-{city|area}              → ${inventory.layer2ServiceLocationUrls.toLocaleString()}`,
);
console.log(
  `  3. /{service}-{city|area}-{intent}     → ${inventory.layer3IntentUrls.toLocaleString()}`,
);
console.log(`  Total addressable                      → ${inventory.addressableUrls.toLocaleString()}`);
console.log("");
console.log(
  `Indexable programmatic (est.): ${inventory.indexableProgrammaticEstimate.toLocaleString()}`,
);
console.log(`Indexable intent URLs: ${inventory.indexableIntentUrls.toLocaleString()}`);
console.log(`Indexable sitemap (est.): ~${inventory.indexableSitemapEstimate.toLocaleString()}`);
console.log(
  `Programmatic sitemap shards: ${Math.ceil(inventory.indexableProgrammaticEstimate / 40000)}`,
);
console.log(`Warm static at build: ~${inventory.warmStaticAtBuild.toLocaleString()}`);
console.log(`Legacy indexable pages: ${legacyIndexable}`);
console.log(`Report: ${filePath}`);
