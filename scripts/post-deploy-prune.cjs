/**
 * After standalone bundle is ready, remove build-only artifacts to save disk.
 * Safe when PM2 runs from .next/standalone/server.js (see ecosystem.config.cjs).
 *
 * Set KEEP_NODE_MODULES=1 to skip node_modules removal (e.g. local dev).
 */
const { existsSync, rmSync, readdirSync, statSync } = require("node:fs");
const { join } = require("node:path");

const root = process.cwd();
const standaloneDir = join(root, ".next", "standalone");
const keepNodeModules =
  process.env.KEEP_NODE_MODULES === "1" || process.env.PRUNE_NODE_MODULES !== "1";

if (!existsSync(join(standaloneDir, "server.js"))) {
  console.error("post-deploy-prune: missing .next/standalone/server.js — skip prune.");
  process.exit(0);
}

function rm(path, label) {
  if (!existsSync(path)) return;
  rmSync(path, { recursive: true, force: true });
  console.log(`  removed ${label}`);
}

function stripMaps(dir) {
  if (!existsSync(dir)) return;
  let count = 0;
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      const p = join(d, name);
      const st = statSync(p);
      if (st.isDirectory()) walk(p);
      else if (name.endsWith(".map")) {
        rmSync(p, { force: true });
        count++;
      }
    }
  };
  walk(dir);
  if (count) console.log(`  stripped ${count} source map files from standalone`);
}

console.log("post-deploy-prune: freeing build-only disk…");

// Next build outputs (already copied into standalone)
const nextDir = join(root, ".next");
for (const sub of ["cache", "diagnostics", "trace", "types", "server", "static"]) {
  rm(join(nextDir, sub), `.next/${sub}`);
}

stripMaps(standaloneDir);

if (!keepNodeModules && existsSync(join(root, "node_modules"))) {
  rm(join(root, "node_modules"), "node_modules (runtime uses standalone bundle)");
}

// Dev/build caches at repo root
for (const sub of [".turbo", ".eslintcache"]) {
  rm(join(root, sub), sub);
}

console.log("post-deploy-prune: done.");
