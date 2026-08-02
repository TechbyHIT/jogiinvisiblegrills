/**
 * After `npm run build`, copy static assets into the standalone output folder.
 * Required for `node .next/standalone/server.js` (PM2 / nginx).
 */
const { cpSync, existsSync, mkdirSync } = require("node:fs");
const { join } = require("node:path");

const root = process.cwd();
const standaloneDir = join(root, ".next", "standalone");
const staticDir = join(root, ".next", "static");
const publicDir = join(root, "public");

if (!existsSync(join(standaloneDir, "server.js"))) {
  console.error("Missing .next/standalone/server.js — run npm run build first.");
  process.exit(1);
}

const standaloneNext = join(standaloneDir, ".next");
mkdirSync(standaloneNext, { recursive: true });

cpSync(publicDir, join(standaloneDir, "public"), { recursive: true });
cpSync(staticDir, join(standaloneNext, "static"), { recursive: true });

console.log("Standalone bundle ready:");
console.log(`  ${join(standaloneDir, "server.js")}`);
console.log("  public/ and .next/static/ copied.");
