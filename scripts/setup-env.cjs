/**
 * Creates .env.local from .env.example (no manual typing).
 * Generates random ADMIN_PASSWORD and REVALIDATE_SECRET on first run.
 */
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const root = path.join(__dirname, "..");
const examplePath = path.join(root, ".env.example");
const localPath = path.join(root, ".env.local");

if (!fs.existsSync(examplePath)) {
  console.error("Missing .env.example — pull latest from git.");
  process.exit(1);
}

if (fs.existsSync(localPath)) {
  console.log(".env.local already exists — left unchanged.");
  process.exit(0);
}

let content = fs.readFileSync(examplePath, "utf8");
const adminSecret = crypto.randomBytes(18).toString("base64url");
const revalidateSecret = crypto.randomBytes(24).toString("base64url");

content = content.replace(
  /^ADMIN_PASSWORD=.*$/m,
  `ADMIN_PASSWORD=${adminSecret}`,
);
content = content.replace(
  /^REVALIDATE_SECRET=.*$/m,
  `REVALIDATE_SECRET=${revalidateSecret}`,
);

fs.writeFileSync(localPath, content, { encoding: "utf8", mode: 0o600 });
console.log("Created .env.local from .env.example (secrets auto-generated).");
console.log("Save ADMIN_PASSWORD from .env.local if you need admin login.");
