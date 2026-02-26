// scripts/generate-schema.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "knowledge");
const out = path.join(process.cwd(), "public");

// Scan all markdown files in /knowledge
const files = fs.readdirSync(dir).filter(f => f.endsWith(".md") && f !== "README.md");

if (files.length === 0) {
    console.log("⚠️ No knowledge files found for schema generation.");
    process.exit(0);
}

fs.mkdirSync(out, { recursive: true });

files.forEach(file => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data } = matter(raw);

    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.title,
        author: {
            "@type": "Person",
            name: data.author || "Unknown"
        },
        dateModified: data.last_updated,
        mainEntityOfPage: data.slug
    };

    const schemaFilename = `${data.topic || path.parse(file).name}.json`;
    fs.writeFileSync(path.join(out, schemaFilename), JSON.stringify(schema, null, 2));
    console.log(`✅ Schema generated: ${schemaFilename}`);
});
