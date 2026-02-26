# AI Pilots: Content & Newsletter Queue

Use this checklist to track the rollout of the 50 high-authority content pieces. Mark as `[x]` only after the page is live and CloudFront cache is invalidated.

## Phase 1: The Authority Foundation (1-10)
- [ ] **01: Cornerstone Guide** - [TITLE_FOR_PILLAR_1]
- [ ] **02: Locality Anchor** - [TITLE_FOR_LOCAL_ANCHOR_1]
- [ ] **03: Service Deep Dive** - [TITLE_FOR_SERVICE_DEEP_DIVE_1]
- [ ] **04: Project Spotlight** - [TITLE_FOR_CASE_STUDY_1]
- [ ] **05: PAA Capture** - [TITLE_FOR_FAQ_FOCUS_1]
- [ ] **06: Service Deep Dive** - [TITLE_FOR_SERVICE_DEEP_DIVE_2]
- [ ] **07: Pro Tip** - [TITLE_FOR_EXPERT_TIP_1]
- [ ] **08: Project Spotlight** - [TITLE_FOR_CASE_STUDY_2]
- [ ] **09: PAA Capture** - [TITLE_FOR_FAQ_FOCUS_2]
- [ ] **10: Locality Anchor** - [TITLE_FOR_LOCAL_ANCHOR_2]

## Phase 2: Strategic Expansion (11-30)
- [ ] **11:** [PLANNED_TOPIC]
- [ ] **12:** [PLANNED_TOPIC]
- [ ] **30:** ...

## Phase 3: Domain Dominance (31-50)
- [ ] **31:** ...
- [ ] **50:** ...

> [!IMPORTANT]
> **Deployment Rule**: Every time a checkbox is marked `[x]`, you must:
> 1. Sync the repo: `git add . && git commit -m "feat: deploy content piece #[XX]" && git push`
> 2. Sync S3: `aws s3 sync . s3://[AWS_S3_BUCKET] --profile [AWS_PROFILE]`
> 3. Invalidate: `aws cloudfront create-invalidation --distribution-id [AWS_DIST_ID] --paths "/news/*" "/blog/*" --profile [AWS_PROFILE]`
