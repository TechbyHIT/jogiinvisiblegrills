/** PM2 — Jogi Invisible Grills (https://www.jogiinvisiblegrills.in) */
const path = require("node:path");
const site = require("./deploy/site-port.cjs");

const standaloneDir = path.join(__dirname, ".next", "standalone");

module.exports = {
  apps: [
    {
      name: site.PM2_NAME,
      cwd: standaloneDir,
      script: "server.js",
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
        HOSTNAME: site.HOSTNAME,
      },
      env_file: path.join(standaloneDir, ".env.local"),
    },
  ],
};
