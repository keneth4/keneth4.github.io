import path from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = process.cwd();
const buildScript = path.join(repoRoot, "scripts", "build-cloudflare-assets.mjs");
const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";

const buildResult = spawnSync(process.execPath, [buildScript], { stdio: "inherit" });

if (buildResult.status !== 0) {
  process.exit(buildResult.status ?? 1);
}

const deployResult = spawnSync(npxCommand, ["wrangler", "deploy"], { stdio: "inherit" });

process.exit(deployResult.status ?? 1);
