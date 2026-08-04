/**
 * Start standalone server on the configured production port (3002).
 */
const { spawn } = require("node:child_process");
const path = require("node:path");
const site = require("../deploy/site-port.cjs");

const serverJs = path.join(process.cwd(), ".next", "standalone", "server.js");

const child = spawn(process.execPath, [serverJs], {
  stdio: "inherit",
  env: {
    ...process.env,
    NODE_ENV: "production",
    PORT: String(site.PORT),
    HOSTNAME: site.HOSTNAME,
  },
});

child.on("exit", (code) => process.exit(code ?? 1));
