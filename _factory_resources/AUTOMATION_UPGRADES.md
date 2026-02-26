# Automation Upgrades: V2 -> V3 Transition

## Friction Points Identified (V2 Retro)
1.  **Legacy Asset Hangover**: We carried ~50 unused landscaping images until the very end. The repo was 2x larger than necessary.
2.  **Manual Blog formatting**: Creating the HTML structure for blogs manually is error-prone. The Python script approach was superior.
3.  **Footer Segmentation**: We had to manually inject neighborhood lists into 20+ files. This should be automated.

## V3 Upgrade Requirements

### 1. The "Lean Purge" Protocol
**What**: A mandatory step *after* the initial rebrand (Step 6) but *before* final deployment to scan for and delete unused assets.
**Implementation**: Added `Step 5b` to `DEPLOYMENT_ORDER.md`.
**Tool**: `scripts/find_unused_images.py` (Now part of the standard kit).

### 2. The "Content Factory" Module
**What**: Formalizing the Python-based blog generation as a standard phase, not an ad-hoc task.
**Implementation**: Added `Step 9` to `DEPLOYMENT_ORDER.md`.
**Artifacts**: `scripts/generate_blog_batch.py` and `scripts/template_blog.html` should be standard.

### 3. Local Signal Injection Script
**What**: Instead of manually editing footers, we use `scripts/amplify_local_footer.py`.
**Logic**:
-   Define a list of `neighborhoods = ["Area A", "Area B", ...]`
-   Script hunts for the `<!-- Neighborhoods SEO Block -->` marker (or creates it).
-   Injects the HTML block into every `.html` file.
**Benefit**: 100% consistency, 0 manual errors, instant sitewide updates.

### 4. Continuous Schema Validation
**What**: `preflight_audit.py` currently checks regex. V3 should import `json` and `jsonschema` to validate structure.
**Action**: Update `preflight_audit.py` to `json.loads()` every `application/ld+json` block to catch syntax errors (trailing commas, missing quotes).
