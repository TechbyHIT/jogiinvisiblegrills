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
      max_memory_restart: "1024M",
      env: {
        NODE_ENV: "production",
        /** Dedicated port — do not share 3000 with other sites on the same VPS (e.g. Deva Safety Nets). */
        PORT: 3004,
        HOSTNAME: "127.0.0.1",
      },
      /** Runtime reads `.env.local` if present (copied by prepare-standalone.cjs). */
      env_file: path.join(standaloneDir, ".env.local"),
    },
  ],
};
