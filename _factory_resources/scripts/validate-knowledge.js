// scripts/validate-knowledge.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "knowledge");

const REQUIRED = [
    "type",
    "canonical",
    "topic",
    "intent",
    "priority",
    "title",
    "slug"
];

let failed = false;

fs.readdirSync(dir)
    .filter(f => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
    .forEach(file => {
        const raw = fs.readFileSync(path.join(dir, file), "utf8");
        const { data } = matter(raw);

        REQUIRED.forEach(field => {
            if (!(field in data)) {
                console.error(`❌ ${file} missing: ${field}`);
                failed = true;
            }
        });
    });

if (failed) process.exit(1);
console.log("✅ Knowledge frontmatter valid");
