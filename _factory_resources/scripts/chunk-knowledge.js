// scripts/chunk-knowledge.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "knowledge");

// Scan all markdown files in /knowledge
const files = fs.readdirSync(dir).filter(f => f.endsWith(".md") && f !== "README.md");

if (files.length === 0) {
    console.log("⚠️ No knowledge files found to chunk.");
    process.exit(0);
}

let allChunks = {};

files.forEach(file => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { content, data } = matter(raw);

    const chunks = content
        .split("\n## ")
        .map(c => c.trim())
        .filter(Boolean);

    allChunks[data.topic || file] = chunks;
    console.log(`✅ Chunked: ${file}`);
});

fs.writeFileSync(path.join(dir, "chunks.json"), JSON.stringify(allChunks, null, 2));
console.log("✅ All knowledge chunked into knowledge/chunks.json");
