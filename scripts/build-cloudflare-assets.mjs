import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const outputDir = path.join(repoRoot, ".cloudflare-deploy");
const rootEntries = fs.readdirSync(repoRoot, { withFileTypes: true });

const EXCLUDED_ROOT_FILES = new Set([
  ".gitignore",
  ".gitkeep",
  "wrangler.jsonc",
  "wrangler.toml"
]);
const ROOT_DIRECTORIES_TO_COPY = ["demos"];

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

for (const entry of rootEntries) {
  if (!entry.isFile()) {
    continue;
  }

  if (entry.name.startsWith(".")) {
    continue;
  }

  if (EXCLUDED_ROOT_FILES.has(entry.name)) {
    continue;
  }

  fs.copyFileSync(path.join(repoRoot, entry.name), path.join(outputDir, entry.name));
}

for (const directory of ROOT_DIRECTORIES_TO_COPY) {
  const source = path.join(repoRoot, directory);
  const destination = path.join(outputDir, directory);
  fs.cpSync(source, destination, { recursive: true });
}

console.log(`Prepared Cloudflare deploy assets in ${outputDir}`);
