// Runs the steps from the README in one go.
import { execSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";

const valueFile = new URL("../shared/value.js", import.meta.url);

function vitest(args) {
  try {
    execSync(`npx vitest ${args}`, { stdio: "inherit" });
    return true;
  } catch {
    return false;
  }
}

rmSync(valueFile, { force: true });
vitest("--clearCache");

console.log("\n### 1. shared/value.js does not exist yet: both tests fail (expected)\n");
vitest("run");

writeFileSync(valueFile, "export const value = 1;\n");
console.log("\n### 2. shared/value.js now exists: both tests still fail (the bug)\n");
const passedWithCache = vitest("run");

console.log("\n### 3. after vitest --clearCache: both tests pass\n");
vitest("--clearCache");
vitest("run");

process.exitCode = passedWithCache ? 0 : 1;
