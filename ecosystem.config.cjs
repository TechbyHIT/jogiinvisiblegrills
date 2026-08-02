/** PM2 — Jogendhra Invisible Grills (jogendhrainvisiblegrills.in) */
module.exports = {
  apps: [
    {
      name: "jogendhra-invisible-grills",
      cwd: __dirname,
      script: ".next/standalone/server.js",
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "750M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "127.0.0.1",
      },
    },
  ],
};
