// scripts/sterilize-site.js
import fs from "fs";
import path from "path";

// Define the root to sterilize
const siteDir = path.join(process.cwd(), "Website");

// RULES for Sterilization
const replacements = [
    // --- BRANDING ---
    { find: /Reed and Sons/g, replace: "[BUSINESS_NAME]" },
    { find: /Reed and <span>Sons<\/span>/gi, replace: "[BUSINESS_NAME]" },
    { find: /\(661\) 582-2919/g, replace: "[PHONE_NUMBER]" },
    { find: /6615822919/g, replace: "[PHONE_NUMBER_RAW]" },
    { find: /hello@reedandsons.com/g, replace: "[EMAIL_ADDRESS]" },

    // --- LOCATIONS ---
    { find: /Leona Valley/g, replace: "[CITY_HQ]" },
    { find: /Antelope Valley/g, replace: "[REGION]" },
    { find: /Palmdale, Lancaster, Quartz Hill/g, replace: "[SERVICE_AREAS]" }, // Loose match
    { find: /Palmdale/g, replace: "[CITY_1]" },
    { find: /Lancaster/g, replace: "[CITY_2]" },
    { find: /Quartz Hill/g, replace: "[CITY_3]" },

    // --- COLORS (CSS & HTML styles) ---
    // Note: CSS variables should be handled, but hardcoded hexes in HTML/CSS need swapping
    { find: /#1e3c72/gi, replace: "var(--primary-navy)" },
    { find: /#85BB65/gi, replace: "var(--primary-green)" },
    { find: /#152a52/gi, replace: "var(--navy-dark)" },
    { find: /#4A6FA5/gi, replace: "var(--navy-light)" },
    { find: /#A3D68C/gi, replace: "var(--green-light)" },
    { find: /#6B9E4F/gi, replace: "var(--accent-green)" },

    // --- FONTS ---
    { find: /'Poppins', sans-serif/g, replace: "var(--font-heading)" },
    { find: /'Open Sans', sans-serif/g, replace: "var(--font-body)" }
];

let filesProcessed = 0;
let replacementsMade = 0;

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);

    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            walk(fullPath);
        } else if (item.endsWith(".html") || item.endsWith(".css") || item.endsWith(".js") || item.endsWith(".md")) {
            // Process text files
            sterilizeFile(fullPath);
        }
    });
}

function sterilizeFile(filePath) {
    let content = fs.readFileSync(filePath, "utf8");
    let initialContent = content;

    replacements.forEach(rule => {
        // Use String.replace with Global Regex or String
        // For Regex in global scale
        content = content.replace(rule.find, rule.replace);
    });

    if (content !== initialContent) {
        fs.writeFileSync(filePath, content);
        filesProcessed++;
        // console.log(`✨ Sterilized: ${path.relative(process.cwd(), filePath)}`);
    }
}

console.log("🧹 Starting Sterilization Protocol...");
walk(siteDir);
console.log(`✅ Sterilization Complete. Modified ${filesProcessed} files.`);
