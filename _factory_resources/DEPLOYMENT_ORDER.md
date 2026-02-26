# Static Site Template: Automated Deployment Workflow

> [!TIP]
> **To Commencement the Next Run**: Tell the AI Agent, "**Initiate Website Factory Workflow: Run Step 0 of DEPLOYMENT_ORDER.md.**" This will trigger the agent to follow the strict safety and branding protocols we've established.

> [!IMPORTANT]
> **Step 0: The Knowledge Chain (READ ORDER)**
> To ensure absolute brand fidelity and technical success, the AI Agent **MUST** read the following files in this exact sequence before making any edits:
> 1.  **DEPLOYMENT_ORDER.md** (Current: Defines the "How")
> 2.  [CLIENT_INTAKE.md](CLIENT_INTAKE.md) (Defines the "Who" and "Where")
> 3.  [BRAND_GUIDE.md](BRAND_GUIDE.md) (Defines the "Look" and "Feel")
> 4.  [SEO_ROADMAP.md](SEO_ROADMAP.md) (Defines the "Growth" strategy)
> 5.  [BLOG_STRATEGY.md](BLOG_STRATEGY.md) (Defines the "Authority" pillars)
> 6.  [NEWSLETTER_STRATEGY.md](NEWSLETTER_STRATEGY.md) (Defines the "Hub" and "Queue" logic)
> 7.  [CONTENT_QUEUE.md](CONTENT_QUEUE.md) (The 50-post tracking checklist)
> 8.  [COMPETITIVE_ADVANTAGE.md](COMPETITIVE_ADVANTAGE.md) (Defines the "Top 5" reasons why we dominate)

// turbo-all
Follow these steps in strict order to repurpose this template. Do not proceed to the next step until the current step is verified successful.

### Step 1: SEO & Identity Sanitization
- **Action**: Scrub existing branding from `application/ld+json` and `<meta>` tags in all `.html` files.
- **Verification**: Run `grep -r "[OLD_BRAND_NAME]" .` to ensure zero matches in the new build.

### Step 2: Connection & Infrastructure Decoupling
- **Action**: Initialize a new Git repo and verify AWS connectivity. 
- **[CRITICAL] Identity Check**: You **MUST** verify that the AWS targets match the current repository/client.
    1. Open [CLIENT_INTAKE.md](CLIENT_INTAKE.md).
    2. Confirm the **Bucket Name** and **CloudFront ID** are unique to this project.
    3. NEVER use a bucket or distribution ID from a previous template without explicit confirmation.
// turbo
- **Command**: `aws sts get-caller-identity --profile [AWS_PROFILE]`
- **Verification**: Confirm the output shows the `[AWS_PROFILE]` user and that your environment variables (if any) are set to the new project.

### Step 3: Baseline Production Sync (Dry Run First)
- **Action**: Push the sanitized "Clean Slate" to the new production environment.
- **[SAFETY] Dry Run**: Before the first sync, run a dry run to ensure no legacy data is being overwritten.
    - `aws s3 sync . s3://[NEW-BUCKET-NAME] --exclude ".git/*" --profile [AWS_PROFILE] --dryrun`
- **Commands**:
// turbo
  ```bash
  git add . && git commit -m "chore: baseline template reset" && git push
  aws s3 sync . s3://[NEW-BUCKET-NAME] --exclude ".git/*" --profile [AWS_PROFILE]
  aws cloudfront create-invalidation --distribution-id [NEW-DIST-ID] --paths "/*" --profile [AWS_PROFILE]
  ```
- **Verification**: Confirm the site loads the "Clean Slate" version at the new URL.

### Step 4: AI Image Generation & Asset Collection
- **Action**: Generate or collect high-fidelity images for the new niche (Service Heros, Service Cards, Projects).
- **Icons**: Ensure service icons are unified in style (e.g., using FontAwesome or consistent PNGs).
- **Verification**: Confirm all necessary visuals (Heros, Backgrounds, Features) are present in `/images` before optimization.

### Step 5: Asset Transformation & Optimization
- **Action**: Rename new assets to kebab-case and convert all `.png`/`.jpg` to `.webp`.
- **Tool**: Use `/scripts/optimize_assets.py` or `cwebp`.
- **Verification**: Check `/images` to ensure only `.webp`, `.ico`, and `.mp4` remain.

### Step 5b: The Lean Purge (Mandatory)
- **Action**: Run the asset audit script to identify and delete unused legacy images *before* content expansion.
- **Command**: `python3 scripts/find_unused_images.py` -> Review list -> Delete.
- **Goal**: Prevent legacy assets (e.g., "lawn mowers") from polluting the new repo.

### Step 6: Niche Rebranding & Local SEO
- **Action**: Implement new niche content and imagery following this strict order:
    1. **Homepage (`index.html`)**: Establish the header, hero, and core brand voice.
    2. **Parent Service Page (`services/index.html`)**: Define the primary service vertical.
    3. **Service Details (`services/*/index.html`)**: Update all specific service landing pages.
    4. **About Page (`about/index.html`)**: Standardize the story and team sections.
    5. **Contact Page (`contact/index.html`)**: Lock in the lead capture and contact points.
    6. **Legal (`privacy/`, `terms/`)**: Update company names in legal boilerplate.
    7. **Locations (`locations/*/index.html`)**: Finalize all localized landing pages.
- **Pre-Flight**: Check all `tel:` links and contact form `action` endpoints.

### Step 7: Technical SEO & Identity Finalization
- **Action**: Perform a deep-dive audit of Technical Identity.
    1. **Schema.org**: Re-validate `LocalBusiness` and `FAQPage` JSON-LD blocks for correct logo URLs, social links, and business hours.
    2. **Favicon Serialization**: Ensure the new brand's favicon is linked in **all** sub-directory headers (About, Contact, Services, Locations).
    3. **Meta Enrichment**: Verify unique `<title>` and `<meta name="description">` tags for every single page.
    4. **Social Graph**: Update OpenGraph (`og:`) and Twitter (`twitter:`) image/title tags to the new brand.
- **Verification**: Run a final `git search` for the old brand name and check the live site locally.
### Step 8: Pre-Flight Audit & Final Push
- **Action**: Run the automated audit script to ensure 100% brand fidelity and technical health.
- **Command**: `python3 scripts/preflight_audit.py`
- **Verification**: If the script returns "FAIL", resolve all issues before proceeding.
- **Commands**:
// turbo
  ```bash
  git add . && git commit -m "chore: final pre-flight hardening" && git push
  aws s3 sync . s3://[NEW-BUCKET-NAME] --exclude ".git/*" --profile [AWS_PROFILE]
  aws cloudfront create-invalidation --distribution-id [NEW-DIST-ID] --paths "/*" --profile [AWS_PROFILE]
  ```
- **Verification**: Confirm a "PERFECT PASS" from the script and verify the live site one last time.

### Step 9: The Content Factory (Blog Expansion)
- **Action**: Use the Python generation scripts to launch the initial 6-article authority batch.
- **Tools**:
    - `scripts/generate_blog_batch.py` (Core Pillars)
    - `scripts/generate_blog_batch_2.py` (Local Spotlights)
- **Verification**: Ensure `/blog/index.html` links to all new articles and that metadata is distinct.

### Step 10: Continuous Improvement (The Retro)
- **Action**: Review [AUTOMATION_UPGRADES.md](AUTOMATION_UPGRADES.md) to identify friction points from the current run.
- **Verification**: Document at least one "Automation Upgrade" that could have made this pivot faster (e.g., CSS Tokens, Sync Scripts).
- **Goal**: Each deployment should leave the "Website Factory" template stronger than it found it.

---

## 🛡️ The 1000-Mile Rigor: Handling the Complexity
*When the journey gets dark at scale, fall back to these principles:*

- **Infrastructure Collision Prevention**: Before any `aws s3 sync`, explicitly check the `s3://` path. If the bucket already exists and contains files *not* related to the current client, **STOP**. Verify the bucket name in [CLIENT_INTAKE.md](CLIENT_INTAKE.md).
- **The "Dry Run" Mandate**: Never perform the first sync of a session without the `--dryrun` flag. It costs nothing and prevents catastrophic overwrites.
- **Cache Ghosting**: If changes don't appear live after invalidation, check for "Deep Caching" (browser cache, local ISP cache). Use `?v=timestamp` query strings to force a fresh pull.
- **Data Integrity**: Never "assume" a find-and-replace worked across 50+ files. Always use `grep -r` to verify the old brand is 100% purged.
- **The "Check Twice" Rule**: In the darkness of a massive rollout, slow is smooth and smooth is fast. Verify Step 1 before moving to Step 2.
