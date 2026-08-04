/**
 * After `npm run build`, copy static assets into the standalone output folder.
 * Required for `node .next/standalone/server.js` (PM2 / nginx).
 */
const { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } = require("node:fs");
const { join } = require("node:path");
const site = require("../deploy/site-port.cjs");

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

const envLocal = join(root, ".env.local");
const standaloneEnv = join(standaloneDir, ".env.local");
if (existsSync(envLocal)) {
  cpSync(envLocal, standaloneEnv);
  console.log("  .env.local copied into standalone bundle.");
} else {
  writeFileSync(standaloneEnv, "", "utf8");
}

let envBody = readFileSync(standaloneEnv, "utf8");
if (!/^PORT=/m.test(envBody)) {
  envBody = envBody.trimEnd() + (envBody.endsWith("\n") || envBody.length === 0 ? "" : "\n") + `PORT=${site.PORT}\n`;
  writeFileSync(standaloneEnv, envBody, "utf8");
  console.log(`  PORT=${site.PORT} written into standalone .env.local`);
}

console.log("Standalone bundle ready:");
console.log(`  ${join(standaloneDir, "server.js")}`);
console.log("  public/ and .next/static/ copied.");
