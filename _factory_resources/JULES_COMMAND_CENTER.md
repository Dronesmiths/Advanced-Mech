# 🤖 Jules Operational Protocol (Google AI Ultra)

This repository is optimized for **Jules Ultra**. Follow these protocols to maintain the "Website Factory" at zero-drift.

## 🛠️ Your Multi-Stage Mission
When tasked with "Provisioning a New Niche," follow this sequence:

1.  **Read the Intent**: Open `_factory_resources/CLIENT_INTAKE.md` to see the new Brand and Niche.
2.  **Infrastructure Initialization**: Run `npm run provision`. (This creates the S3 bucket and CloudFront distro and writes the keys back to the intake).
3.  **Hydration**: Run `npm run launch`. (This builds the site with the new branding).
4.  **Verification**: Open `public/index.html` and verify the `[BUSINESS_NAME]` placeholders are gone.
5.  **Deployment**: Run `npm run deploy`.

## 📜 Regulatory Constraints
- **Canonical Protection**: Never edit files in `/knowledge` unless explicitly asked.
- **Sterilization**: 100% replacement of placeholders is mandatory.
- **Asset Integrity**: Ensure all images are versioned (e.g., `?v=3.0`) via `scripts/cache-buster.py` to prevent CloudFront ghosting.

## 🚀 Current Backlog for Jules
- [ ] **Technical SEO Audit**: Check all pages for unique meta descriptions.
- [ ] **Blog Expansion**: Use the `[REGION]` tag to generate 3 more local blog posts.
- [ ] **Lighthouse Hardening**: Identify and fix any render-blocking CSS.
