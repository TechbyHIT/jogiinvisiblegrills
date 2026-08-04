/**
 * PM2 for ap-sites (/srv/sites/jogiinvisiblegrills/current).
 * Supports both layouts:
 *   - flat:  current/server.js
 *   - standalone: current/.next/standalone/server.js
 */
const fs = require("node:fs");
const path = require("node:path");
const site = require("./site-port.cjs");

const releaseRoot = path.join(__dirname, "..");
const standaloneDir = path.join(releaseRoot, ".next", "standalone");
const standaloneServer = path.join(standaloneDir, "server.js");
const flatServer = path.join(releaseRoot, "server.js");

const useStandalone = fs.existsSync(standaloneServer);
const cwd = useStandalone ? standaloneDir : releaseRoot;
const script = useStandalone ? "server.js" : fs.existsSync(flatServer) ? "server.js" : "server.js";

if (!fs.existsSync(path.join(cwd, script))) {
  console.error(`Missing server.js in ${cwd}`);
}

module.exports = {
  apps: [
    {
      name: site.AP_SITES_PM2_NAME,
      cwd,
      script,
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "768M",
      max_restarts: 15,
      min_uptime: "10s",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env: {
        NODE_ENV: "production",
        NODE_OPTIONS: "--max-old-space-size=512",
        PORT: site.PORT,
        /** Must be 127.0.0.1 — "localhost" binds IPv6-only and breaks nginx + curl to 127.0.0.1 */
        HOSTNAME: site.HOSTNAME,
      },
      env_file: path.join(cwd, ".env.local"),
    },
  ],
};
