// scripts/vector-export.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import crypto from "crypto";

const knowledgeDir = path.join(process.cwd(), "knowledge");
const chunkFile = path.join(process.cwd(), "knowledge", "chunks.json");
const output = path.join(process.cwd(), "public", "vectors.json");

if (!fs.existsSync(chunkFile)) {
    console.log("⚠️ No chunks found. Run knowledge:chunk first.");
    process.exit(1);
}

const chunks = JSON.parse(fs.readFileSync(chunkFile, "utf8"));
const vectors = [];

Object.keys(chunks).forEach(topic => {
    chunks[topic].forEach((text, index) => {
        const id = crypto.createHash("md5").update(`${topic}-${index}`).digest("hex");
        vectors.push({
            id: id,
            text: text,
            metadata: {
                topic: topic,
                chunk_index: index,
                source: "knowledge-factory"
            }
        });
    });
});

fs.mkdirSync(path.join(process.cwd(), "public"), { recursive: true });
fs.writeFileSync(output, JSON.stringify(vectors, null, 2));

console.log(`✅ Vector export complete: ${vectors.length} vectors ready for ingestion.`);
