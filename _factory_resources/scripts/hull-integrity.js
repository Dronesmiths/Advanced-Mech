// scripts/hull-integrity.js
import fs from "fs";
import path from "path";

const publicDir = path.join(process.cwd(), "public");
let structuralBreaches = 0;

function scanDir(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            scanDir(fullPath);
        } else if (file.endsWith(".html")) {
            checkIntegrity(fullPath);
        }
    });
}

function checkIntegrity(filePath) {
    const content = fs.readFileSync(filePath, "utf8");
    const relativePath = path.relative(publicDir, filePath);

    // Check 1: Missing H1
    if (!content.includes("<h1")) {
        console.error(`⚠️ STRUCTURAL BREACH: No <h1> tag in ${relativePath}`);
        structuralBreaches++;
    }

    // Check 2: Images missing Alt
    const imgRegex = /<img(?![^>]*\balt=)[^>]*>/g;
    if (imgRegex.test(content)) {
        console.error(`⚠️ STRUCTURAL BREACH: Image missing 'alt' attribute in ${relativePath}`);
        structuralBreaches++;
    }

    // Check 3: Depth (Max 3 levels deep)
    const depth = relativePath.split(path.sep).length;
    if (depth > 4) { // public/level1/level2/level3/index.html
        console.warn(`⚠️ DEPTH WARNING: URL structure is too deep (${depth} levels) in ${relativePath}`);
    }
}

console.log("🛡️ Checking Hull Integrity...");
if (fs.existsSync(publicDir)) {
    scanDir(publicDir);
} else {
    console.error("❌ Public directory missing.");
    process.exit(1);
}

if (structuralBreaches > 0) {
    console.error(`💥 Hull Integrity Compromised: ${structuralBreaches} breaches detected.`);
    process.exit(1);
} else {
    console.log("✅ Hull Integrity Verified. Ship is watertight.");
}
