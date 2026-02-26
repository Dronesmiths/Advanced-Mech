// scripts/render-html.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const src = "knowledge";
const out = "public";

fs.mkdirSync(out, { recursive: true });

fs.readdirSync(src)
    .filter(f => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
    .forEach(file => {
        const raw = fs.readFileSync(`${src}/${file}`, "utf8");
        const { data, content } = matter(raw);

        const html = marked(content);

        const page = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${data.title}</title>
<link rel="canonical" href="${data.slug}" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
</head>
<body>
<main>
${html}
</main>
</body>
</html>`;

        const outputPath = `${out}${data.slug}/index.html`;
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, page);

        console.log("✅ Rendered", outputPath);
    });
