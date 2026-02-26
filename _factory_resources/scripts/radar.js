// scripts/radar.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const knowledgeDir = path.join(process.cwd(), "knowledge");
const publicDir = path.join(process.cwd(), "public");
const BASE_URL = "https://[DOMAIN]"; // Should be replaced by env var in production

// 1. Scan Knowledge
const pages = [];
fs.readdirSync(knowledgeDir)
    .filter(f => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
    .forEach(file => {
        const raw = fs.readFileSync(path.join(knowledgeDir, file), "utf8");
        const { data } = matter(raw);
        if (data.slug) {
            pages.push({
                url: `${BASE_URL}${data.slug}`,
                lastmod: data.last_updated || new Date().toISOString().split("T")[0],
                title: data.title || "Untitled"
            });
        }
    });

// 2. Generate Sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
  </url>`).join("\n")}
</urlset>`;

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
console.log(`✅ Radar: Sitemap generated with ${pages.length} URLs.`);

// 3. Generate RSS.xml
const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>[BUSINESS_NAME] Updates</title>
  <link>${BASE_URL}</link>
  <description>Latest knowledge from [BUSINESS_NAME]</description>
${pages.map(page => `  <item>
    <title>${page.title}</title>
    <link>${page.url}</link>
    <pubDate>${new Date(page.lastmod).toUTCString()}</pubDate>
  </item>`).join("\n")}
</channel>
</rss>`;

fs.writeFileSync(path.join(publicDir, "rss.xml"), rss);
console.log(`✅ Radar: RSS Feed generated.`);
