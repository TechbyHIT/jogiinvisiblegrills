import fs from "node:fs";
import path from "node:path";

export function ensureReportsDir(): string {
  const reportsDir = path.join(process.cwd(), "reports");
  fs.mkdirSync(reportsDir, { recursive: true });
  return reportsDir;
}

export function writeReport(filename: string, data: unknown): string {
  const reportsDir = ensureReportsDir();
  const filePath = path.join(reportsDir, filename);
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  return filePath;
}

export function parseCliArgs(argv: string[]): Record<string, string> {
  const args: Record<string, string> = {};

  for (const token of argv) {
    if (!token.startsWith("--")) {
      continue;
    }

    const [key, value] = token.slice(2).split("=");
    if (key) {
      args[key] = value ?? "true";
    }
  }

  return args;
}
