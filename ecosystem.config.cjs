/** PM2 — Jogi Invisible Grills (https://www.jogiinvisiblegrills.in) */
const path = require("node:path");

const standaloneDir = path.join(__dirname, ".next", "standalone");

module.exports = {
  apps: [
    {
      name: "jogi-invisible-grills",
      cwd: standaloneDir,
      script: "server.js",
      instances: 1,
      exec_mode: "fork",
      instances: 1,
      max_memory_restart: "768M",
      max_restarts: 15,
      min_uptime: "10s",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env: {
        NODE_ENV: "production",
        NODE_OPTIONS: "--max-old-space-size=512",
        /** Dedicated port — do not share 3000 with other sites on the same VPS (e.g. Deva Safety Nets). */
        PORT: 3002,
        HOSTNAME: "127.0.0.1",
      },
      /** Runtime reads `.env.local` if present (copied by prepare-standalone.cjs). */
      env_file: path.join(standaloneDir, ".env.local"),
    },
  ],
};
