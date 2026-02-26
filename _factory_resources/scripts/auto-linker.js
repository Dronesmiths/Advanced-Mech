// scripts/auto-linker.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const knowledgeDir = path.join(process.cwd(), "knowledge");
const publicDir = path.join(process.cwd(), "public");

// 1. Build Dictionary of Topics
const topics = [];
fs.readdirSync(knowledgeDir)
    .filter(f => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
    .forEach(file => {
        const raw = fs.readFileSync(path.join(knowledgeDir, file), "utf8");
        const { data } = matter(raw);
        if (data.title && data.slug) {
            topics.push({ term: String(data.title), url: data.slug });
        }
    });

console.log(`🔗 Found ${topics.length} topics to link.`);

// 2. Scan Public HTML and Link
function processDir(directory) {
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDir(fullPath);
        } else if (file.endsWith(".html")) {
            let content = fs.readFileSync(fullPath, "utf8");
            let modified = false;

            topics.forEach(topic => {
                // Simple regex to replace first occurrence of term not inside a tag
                // Note: This is a basic implementation. For production, use DOM parser.
                const regex = new RegExp(`(?<!<[^>]*)\\b${escapeRegExp(topic.term)}\\b`, "i");
                if (regex.test(content) && !content.includes(`href="${topic.url}"`)) {
                    content = content.replace(regex, `<a href="${topic.url}">${topic.term}</a>`);
                    modified = true;
                }
            });

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log(`🔗 Linked in: ${file}`);
            }
        }
    });
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

if (fs.existsSync(publicDir)) {
    processDir(publicDir);
    console.log("✅ Auto-linking complete.");
} else {
    console.log("⚠️ Public directory not found. Run render first.");
}
