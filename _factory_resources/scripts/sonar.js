// scripts/sonar.js
import fs from "fs";
import path from "path";

const publicDir = path.join(process.cwd(), "public");

if (!fs.existsSync(publicDir)) {
    console.error("❌ Public directory not found. Run build first.");
    process.exit(1);
}

let brokenLinks = 0;
let filesScanned = 0;

function scanDir(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            scanDir(fullPath);
        } else if (file.endsWith(".html")) {
            filesScanned++;
            checkLinks(fullPath);
        }
    });
}

function checkLinks(filePath) {
    const content = fs.readFileSync(filePath, "utf8");
    // Regex for internal links (relative or root-relative)
    const regex = /href="(\/[^"]*|[^"]*)"/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
        let link = match[1];

        // Retrieve Clean Link if Anchor
        if (link.includes("#")) {
            link = link.split("#")[0];
        }

        // Ignore Empty Links or Anchors only
        if ((!link) || (link === "")) continue;

        // Skip external links
        if (link.startsWith("http") || link.startsWith("//") || link.startsWith("mailto:") || link.startsWith("tel:")) continue;

        // Resolve absolute from publicDir
        let targetPath;
        if (link.startsWith("/")) {
            targetPath = path.join(publicDir, link);
        } else {
            targetPath = path.join(path.dirname(filePath), link);
        }

        // Handle Clean URLs (e.g. /about/ -> /about/index.html)
        if (!path.extname(targetPath)) {
            targetPath = path.join(targetPath, "index.html");
        }

        if (!fs.existsSync(targetPath)) {
            console.error(`❌ BROKEN LINK in ${path.relative(publicDir, filePath)}: ${match[1]} -> ${targetPath}`);
            brokenLinks++;
        }
    }
}

console.log("📡 Sonar Scanning for Broken Links...");
scanDir(publicDir);

if (brokenLinks > 0) {
    console.error(`💥 Sonar detected ${brokenLinks} broken links.`);
    process.exit(1);
} else {
    console.log(`✅ Sonar Safe: ${filesScanned} files scanned. No broken links.`);
}
