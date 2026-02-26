// scripts/launch-client.js
import fs from "fs";
import path from "path";

// Paths
const intakePath = path.join(process.cwd(), "CLIENT_INTAKE.md");
const templateDir = path.join(process.cwd(), "Website");
const outputDir = path.join(process.cwd(), "public");

// 1. Parse Intake
if (!fs.existsSync(intakePath)) {
    console.error("❌ CLIENT_INTAKE.md not found.");
    process.exit(1);
}

const intakeRaw = fs.readFileSync(intakePath, "utf8");
const config = {};

// Regex parsers for intake keys
const parseRule = (label) => {
    const regex = new RegExp(`- \\*\\*${label}\\*\\*: (.*)`, "i");
    const match = intakeRaw.match(regex);
    return match ? match[1].trim() : null;
};

// Populate Config
config["[BUSINESS_NAME]"] = parseRule("Business Name");
config["[INDUSTRY_OR_NICHE]"] = parseRule("Industry/Niche");
config["[TONE_OF_VOICE]"] = parseRule("Voice/Tone");

config["[PRIMARY_COLOR]"] = parseRule("Primary Color");
config["[SECONDARY_COLOR]"] = parseRule("Secondary Color");
config["[PRIMARY_DARK]"] = parseRule("Primary Dark");
config["[PRIMARY_LIGHT]"] = parseRule("Primary Light");
config["[SECONDARY_LIGHT]"] = parseRule("Secondary Light");
config["[SECONDARY_DARK]"] = parseRule("Secondary Dark");

config["[FONT_HEADING]"] = parseRule("Heading Font");
config["[FONT_BODY]"] = parseRule("Body Font");

config["[CITY_HQ]"] = parseRule("Primary HQ");
config["[REGION]"] = parseRule("Region");
config["[SERVICE_AREAS]"] = parseRule("Service Areas List");
config["[CITY_1]"] = parseRule("Key Cities")?.split(",")[0]?.trim();
config["[CITY_2]"] = parseRule("Key Cities")?.split(",")[1]?.trim();
config["[CITY_3]"] = parseRule("Key Cities")?.split(",")[2]?.trim();
config["[CITY_4]"] = parseRule("Key Cities")?.split(",")[3]?.trim();
config["[CITY_5]"] = parseRule("Key Cities")?.split(",")[4]?.trim();
config["[CITY_6]"] = parseRule("Key Cities")?.split(",")[5]?.trim();

config["[KEYWORD_1]"] = parseRule("Primary Keywords")?.split('"')[1];

config["[PHONE_NUMBER]"] = parseRule("Phone Number");
config["[PHONE_NUMBER_RAW]"] = parseRule("Phone Raw");
config["[EMAIL_ADDRESS]"] = parseRule("Email Address");
config["[AWS_S3_BUCKET_NAME]"] = parseRule("AWS Bucket Name");
config["[AWS_CLOUDFRONT_ID]"] = parseRule("CloudFront Distribution ID");
config["[CLOUDFRONT_URL]"] = parseRule("CloudFront URL");

// Services
config["[SERVICE_4_TITLE]"] = parseRule("Service 4 Title");
config["[SERVICE_4_DESC]"] = parseRule("Service 4 Desc");
config["[SERVICE_5_TITLE]"] = parseRule("Service 5 Title");
config["[SERVICE_5_DESC]"] = parseRule("Service 5 Desc");
config["[SERVICE_6_TITLE]"] = parseRule("Service 6 Title");
config["[SERVICE_6_DESC]"] = parseRule("Service 6 Desc");

// Compliance & External
config["[LICENSE_TEXT]"] = parseRule("License Info");
config["[GOOGLE_MAPS_URL]"] = parseRule("Google Maps URL");

// Verify critical keys
if (!config["[BUSINESS_NAME]"]) {
    console.error("❌ Business Name missing in CLIENT_INTAKE.md");
    process.exit(1);
}

console.log("📝 Configuration Parsed:", config);

// 2. Copy Template to Public
function copyDir(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

console.log(`🚀 Copying template from ${templateDir} to ${outputDir}...`);
copyDir(templateDir, outputDir);

// 3. Hydrate Public
let filesProcessed = 0;

function hydrate(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const consoleEntry of entries) {
        const fullPath = path.join(dir, consoleEntry.name);

        if (consoleEntry.isDirectory()) {
            hydrate(fullPath);
        } else if (consoleEntry.name.endsWith(".html") || consoleEntry.name.endsWith(".css") || consoleEntry.name.endsWith(".js")) {
            let content = fs.readFileSync(fullPath, "utf8");
            let initialContent = content;

            Object.keys(config).forEach(placeholder => {
                if (config[placeholder]) {
                    // Global replacement
                    const val = config[placeholder];
                    content = content.replace(new RegExp(escapeRegExp(placeholder), "g"), val);
                }
            });

            if (content !== initialContent) {
                fs.writeFileSync(fullPath, content);
                filesProcessed++;
            }
        }
    }
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

console.log("💧 Hydrating template with client data...");
hydrate(outputDir);
console.log(`✅ Launch Complete. Hydrated ${filesProcessed} files.`);
console.log(`👉 Your site is ready in /public. Run 'npm run knowledge:deploy' (if setup) or upload to S3.`);
