
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const intakePath = path.join(process.cwd(), 'CLIENT_INTAKE.md');

// 1. Read and Parse Intake
if (!fs.existsSync(intakePath)) {
    console.error("❌ CLIENT_INTAKE.md not found.");
    process.exit(1);
}

let intakeContent = fs.readFileSync(intakePath, 'utf8');

const getValue = (label) => {
    const regex = new RegExp(`- \\*\\*${label}\\*\\*: (.*)`, 'i');
    const match = intakeContent.match(regex);
    return match ? match[1].trim() : null;
};

const bizName = getValue("Business Name");
const niche = getValue("Industry/Niche");

if (!bizName || bizName === "[BUSINESS_NAME]") {
    console.error("❌ Business Name not set in CLIENT_INTAKE.md. Please fill it out first.");
    process.exit(1);
}

// 2. Generate Unique Names
const clean = (str) => str.toLowerCase().replace(/[^a-z0-0]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
const projectSlug = `${clean(bizName)}-${clean(niche || 'site')}`;
const bucketName = `${projectSlug}-${Date.now()}`;

console.log(`🏗️  Provisioning AWS for: ${bizName}`);
console.log(`🪣  Bucket: ${bucketName}`);

try {
    // 3. Create S3 Bucket
    console.log("Creating S3 Bucket...");
    execSync(`aws s3 mb s3://${bucketName}`, { stdio: 'inherit' });

    // 4. Configure Public Access
    console.log("Configuring Public Access...");
    execSync(`aws s3api put-public-access-block --bucket ${bucketName} --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"`, { stdio: 'inherit' });

    // 5. Enable Website Hosting
    console.log("Enabling Static Website Hosting...");
    execSync(`aws s3 website s3://${bucketName} --index-document index.html --error-document index.html`, { stdio: 'inherit' });

    // 6. Bucket Policy
    console.log("Applying Public Read Policy...");
    const policy = {
        Version: "2012-10-17",
        Statement: [{
            Sid: "PublicRead",
            Effect: "Allow",
            Principal: "*",
            Action: "s3:GetObject",
            Resource: `arn:aws:s3:::${bucketName}/*`
        }]
    };
    fs.writeFileSync('temp_policy.json', JSON.stringify(policy));
    execSync(`aws s3api put-bucket-policy --bucket ${bucketName} --policy file://temp_policy.json`, { stdio: 'inherit' });
    fs.unlinkSync('temp_policy.json');

    // 7. CloudFront Distribution
    console.log("☁️  Spinning up CloudFront Distribution...");
    const s3Endpoint = `${bucketName}.s3-website-us-east-1.amazonaws.com`;
    const cfConfig = {
        CallerReference: `ref-${bucketName}`,
        DefaultRootObject: "index.html",
        Origins: {
            Quantity: 1,
            Items: [{
                Id: "S3-Website-Origin",
                DomainName: s3Endpoint,
                CustomOriginConfig: {
                    HTTPPort: 80,
                    HTTPSPort: 443,
                    OriginProtocolPolicy: "http-only"
                }
            }]
        },
        DefaultCacheBehavior: {
            TargetOriginId: "S3-Website-Origin",
            ForwardedValues: {
                QueryString: true,
                Cookies: { Forward: "none" }
            },
            TrustedSigners: { Enabled: false, Quantity: 0 },
            ViewerProtocolPolicy: "redirect-to-https",
            MinTTL: 0,
            AllowedMethods: {
                Quantity: 2,
                Items: ["GET", "HEAD"]
            }
        },
        Comment: `Factory Built: ${bizName}`,
        Enabled: true
    };
    fs.writeFileSync('temp_cf.json', JSON.stringify(cfConfig));
    const cfOutput = execSync(`aws cloudfront create-distribution --distribution-config file://temp_cf.json`, { encoding: 'utf8' });
    fs.unlinkSync('temp_cf.json');

    const cfData = JSON.parse(cfOutput);
    const distId = cfData.Distribution.Id;
    const cfUrl = cfData.Distribution.DomainName;

    // 8. Update CLIENT_INTAKE.md
    console.log("📝 Updating CLIENT_INTAKE.md with fresh keys...");
    intakeContent = intakeContent
        .replace(/(\- \*\*AWS Bucket Name\*\*: ).*/, `$1${bucketName}`)
        .replace(/(\- \*\*CloudFront Distribution ID\*\*: ).*/, `$1${distId}`)
        .replace(/(\- \*\*CloudFront URL\*\*: ).*/, `$1${cfUrl}`);

    fs.writeFileSync(intakePath, intakeContent);

    console.log("------------------------------------------------");
    console.log("✅ DEPLOYMENT INFRASTRUCTURE READY!");
    console.log(`🔗 Bucket: ${bucketName}`);
    console.log(`🆔 CF ID: ${distId}`);
    console.log(`🌐 URL: https://${cfUrl}`);
    console.log("------------------------------------------------");

} catch (error) {
    console.error("❌ Infrastructure Provisioning Failed:");
    console.error(error.message);
    process.exit(1);
}
