import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const SOURCE_DIRS = [
  path.join(ROOT, "images", "FINIALIZED PHOTOS"),
  path.join(ROOT, "images", "FINIALIZED PHOTOS - 1"),
  path.join(ROOT, "images", "FINIALIZED PHOTOS - 2"),
  path.join(ROOT, "images", "FINIALIZED PHOTOS - 3"),
  path.join(ROOT, "images", "FINIALIZED PHOTOS - 4"),
];

const OUTPUT_DIR = path.join(ROOT, "public", "images", "projects");
const MANIFEST_PATH = path.join(ROOT, "src", "config", "project-images.generated.ts");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/** Map source folder names (lowercase) to site category slugs. */
const FOLDER_TO_CATEGORIES: Record<string, string[]> = {
  "invisible grill balcony": ["invisible-grills"],
  "invisible grill balcony - 2": ["invisible-grills"],
  "invisible grill balcony - 3": ["invisible-grills"],
  "invisible grill balcony - 4": ["invisible-grills"],
  "invisible grill window": ["invisible-grills"],
  "invisible grill window - 2": ["invisible-grills"],
  siri: ["invisible-grills"],
  "siri-webp": ["invisible-grills"],
  "safety nets balcony": ["safety-nets", "pigeon-nets", "balcony-nets", "bird-nets"],
  "safety nets balcony - 2": ["safety-nets", "pigeon-nets", "balcony-nets", "bird-nets"],
  "safety nets balcony - 3": ["safety-nets", "pigeon-nets", "balcony-nets", "bird-nets"],
  "safety nets balcony - 4": ["safety-nets", "pigeon-nets", "balcony-nets", "bird-nets"],
  "children safety nets": ["safety-nets"],
  "pet safety nets": ["safety-nets"],
  "mosquito nets": ["mosquito-nets"],
  "mosquito nets - 2": ["mosquito-nets"],
  "cricket nets": ["sports-nets"],
  "cloth hangers": ["cloth-hangers"],
  "duct area nets": ["safety-nets", "pigeon-nets"],
  "duct area nets - 2": ["safety-nets", "pigeon-nets"],
  "duct area nets - 3": ["safety-nets", "pigeon-nets"],
  spikes: ["bird-spikes"],
};

const FOLDER_ALT_LABELS: Record<string, string> = {
  "invisible grill balcony": "Balcony invisible grill installation",
  "invisible grill balcony - 2": "Balcony invisible grill project",
  "invisible grill balcony - 3": "High-rise balcony invisible grill",
  "invisible grill balcony - 4": "Premium balcony invisible grill",
  "invisible grill window": "Window invisible grill installation",
  "invisible grill window - 2": "Window invisible grill project",
  siri: "Invisible grill installation",
  "siri-webp": "Invisible grill safety project",
  "safety nets balcony": "Balcony safety net installation",
  "safety nets balcony - 2": "Apartment balcony safety net",
  "safety nets balcony - 3": "Balcony fall protection net",
  "safety nets balcony - 4": "Premium balcony safety net",
  "children safety nets": "Children safety net installation",
  "pet safety nets": "Pet safety net installation",
  "mosquito nets": "Mosquito net installation",
  "mosquito nets - 2": "Sliding mosquito net project",
  "cricket nets": "Cricket practice net installation",
  "cloth hangers": "Ceiling cloth hanger installation",
  "duct area nets": "Duct area safety net",
  "duct area nets - 2": "Utility duct bird net",
  "duct area nets - 3": "Duct area pigeon net",
  spikes: "Bird spike installation",
};

type CatalogEntry = { src: string; alt: string; folder: string };

function slugifyFilename(name: string): string {
  return name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function normalizeFolder(name: string): string {
  return name.toLowerCase().trim();
}

function altForEntry(folderKey: string, category: string): string {
  const base =
    FOLDER_ALT_LABELS[folderKey] ??
    `${category.replace(/-/g, " ")} installation project`;
  return `${base} — Jogendhra Safety Nets Bengaluru & Mysuru`;
}

function sourceBatchLabel(sourceRoot: string): string {
  if (sourceRoot.endsWith("FINIALIZED PHOTOS - 4")) return "fp4";
  if (sourceRoot.endsWith("FINIALIZED PHOTOS - 3")) return "fp3";
  if (sourceRoot.endsWith("FINIALIZED PHOTOS - 2")) return "fp2";
  if (sourceRoot.endsWith("FINIALIZED PHOTOS - 1")) return "fp1";
  return "fp0";
}

function main() {
  const catalog: Record<string, CatalogEntry[]> = {};
  const copiedKeys = new Set<string>();

  for (const sourceRoot of SOURCE_DIRS) {
    if (!fs.existsSync(sourceRoot)) {
      console.warn(`Skipping missing source: ${sourceRoot}`);
      continue;
    }

    const batch = sourceBatchLabel(sourceRoot);

    for (const folder of fs.readdirSync(sourceRoot, { withFileTypes: true })) {
      if (!folder.isDirectory()) continue;
      const folderKey = normalizeFolder(folder.name);
      const categories = FOLDER_TO_CATEGORIES[folderKey];
      if (!categories?.length) continue;

      const folderPath = path.join(sourceRoot, folder.name);
      for (const file of fs.readdirSync(folderPath)) {
        const ext = path.extname(file).toLowerCase();
        if (!IMAGE_EXT.has(ext)) continue;

        const sourcePath = path.join(folderPath, file);

        for (const category of categories) {
          const copyKey = `${sourcePath}::${category}`;
          if (copiedKeys.has(copyKey)) continue;
          copiedKeys.add(copyKey);

          const outFolder = path.join(OUTPUT_DIR, category);
          fs.mkdirSync(outFolder, { recursive: true });

          const base = slugifyFilename(file) || "photo";
          let destName = `${batch}-${base}${ext}`;
          let counter = 1;
          while (fs.existsSync(path.join(outFolder, destName))) {
            destName = `${batch}-${base}-${counter}${ext}`;
            counter++;
          }

          fs.copyFileSync(sourcePath, path.join(outFolder, destName));

          const src = `/images/projects/${category}/${destName}`;
          if (!catalog[category]) catalog[category] = [];
          catalog[category].push({
            src,
            alt: altForEntry(folderKey, category),
            folder: folderKey,
          });
        }
      }
    }
  }

  const lines = [
    "/** Auto-generated by scripts/sync-project-images.ts — do not edit manually. */",
    "export type ProjectImage = { src: string; alt: string };",
    "export const PROJECT_IMAGES_BY_CATEGORY: Record<string, ProjectImage[]> = {",
  ];

  for (const [category, images] of Object.entries(catalog).sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(`  "${category}": [`);
    for (const img of images) {
      const safeAlt = img.alt.replace(/"/g, '\\"');
      lines.push(`    { src: "${img.src}", alt: "${safeAlt}" },`);
    }
    lines.push("  ],");
  }

  lines.push("};", "");

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, lines.join("\n"), "utf8");

  const total = Object.values(catalog).reduce((sum, arr) => sum + arr.length, 0);
  console.log(`Synced ${total} project images across ${Object.keys(catalog).length} categories.`);
  for (const [cat, imgs] of Object.entries(catalog).sort(([a], [b]) => a.localeCompare(b))) {
    console.log(`  ${cat}: ${imgs.length}`);
  }
}

main();
