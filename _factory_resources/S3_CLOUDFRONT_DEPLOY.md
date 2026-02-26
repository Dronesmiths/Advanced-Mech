# AWS S3 & CloudFront Deployment Guide: [BUSINESS_NAME]

This guide provides the specific steps to deploy the [BUSINESS_NAME] website to AWS S3 and CloudFront.

## 1. Prerequisites
- AWS CLI installed and configured.
- AWS Profile `[AWS_PROFILE]` with appropriate permissions.
- Remote Git Repository: `[REPO_URL]`

## 2. Infrastructure Details
- **S3 Bucket**: `[AWS_S3_BUCKET_NAME]`
- **CloudFront Distribution ID**: `[AWS_CLOUDFRONT_ID]`

> [!CAUTION]
> **Check Before Syncing**: Always verify the Bucket Name and Distribution ID in `CLIENT_INTAKE.md` before deploying. Never assume the bucket name from a template is correct for a new client.

## 3. Deployment Workflow

### Step 1: Commit Changes
```bash
git add .
git commit -m "feat: initial brand synchronization and configuration"
git push
```

### Step 2: Pre-Flight Audit (MANDATORY)
Run the automated audit script to verify brand fidelity and link health.
```bash
python3 scripts/preflight_audit.py
```

### Step 3: Sync to S3 (Dry Run First)
Always run with `--dryrun` first to prevent infrastructure collisions.
```bash
aws s3 sync . s3://[AWS_S3_BUCKET_NAME] --exclude ".git/*" --profile [AWS_PROFILE] --dryrun
```

If the dry run is successful:
```bash
aws s3 sync . s3://[AWS_S3_BUCKET_NAME] \
    --exclude ".git/*" \
    --exclude ".DS_Store" \
    --profile [AWS_PROFILE]
```

### Step 4: Invalidate CloudFront Cache
```bash
aws cloudfront create-invalidation \
    --distribution-id [AWS_CLOUDFRONT_ID] \
    --paths "/*" \
    --profile [AWS_PROFILE]
```

## 4. Verification
After deployment, verify the changes at the production URL:
- Check for "[BUSINESS_NAME]" branding.
- Verify the phone number: **[PHONE_NUMBER]**.
- Confirm the brand theme is active.
