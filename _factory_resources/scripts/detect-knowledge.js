// scripts/detect-knowledge.js
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "knowledge");

if (!fs.existsSync(dir)) {
  console.error("❌ /knowledge directory missing");
  process.exit(1);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith(".md") && f.toLowerCase() !== "readme.md");

if (!files.length) {
  console.error("❌ No knowledge markdown files found");
  process.exit(1);
}

console.log("✅ Knowledge files detected:");
files.forEach(f => console.log(" -", f));
