#!/usr/bin/env node
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// --- Node version check ---
const REQUIRED_MAJOR = 20;
const nodeMajor = parseInt(process.versions.node.split(".")[0], 10);
if (nodeMajor < REQUIRED_MAJOR) {
  console.error(
    `❌ Node.js ${REQUIRED_MAJOR}+ is required. Installed: ${process.versions.node}`
  );
  process.exit(1);
}

console.log(`✅ Node.js version is ${process.versions.node}, good to go!`);

// --- Install dependencies if missing ---
if (!fs.existsSync(path.join(path.resolve(), "node_modules"))) {
  console.log("🔄 Installing dependencies from package-lock.json...");
  execSync("npm ci --loglevel=error", { stdio: "inherit" });
}

// --- Check for --production flag ---
const PROD = process.argv.includes("--production");

// --- Run Nuxt ---
try {
  if (PROD) {
    console.log("🏗️ Building Nuxt app for production...");
    execSync("npm run build", { stdio: "inherit" });
    console.log("👀 Previewing production build...");
    execSync("npm run preview", { stdio: "inherit" });
  } else {
    console.log("🚀 Starting Nuxt development server...");
    execSync("npm run dev", { stdio: "inherit" });
  }
} catch (err) {
  console.error("❌ Error running Nuxt:", err);
  process.exit(1);
}
