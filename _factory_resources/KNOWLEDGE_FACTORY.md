# KNOWLEDGE FACTORY — CANONICAL SOURCE

This repository uses a **knowledge-first architecture**.

Markdown knowledge files are the **source of truth**.
All SEO pages, schema, and AI outputs are derived from them.

---

## REQUIRED DIRECTORY STRUCTURE

/knowledge/
  README.md
  <topic>.md          ← canonical knowledge files (YOU write these)

/scripts/
  detect-knowledge.js
  validate-knowledge.js
  render-html.js
  generate-schema.js
  chunk-knowledge.js

/public/
  (generated output)

/.github/workflows/
  knowledge-factory.yml

---

## AGENT RULES (AUTHORITATIVE)

- **Global Context First**: Before proceeding with any task, the agent MUST ingestion all markdown files in `/knowledge` to ensure harmony.
- `/knowledge/*.md` files are canonical and immutable.
- Never rewrite or fragment canonical knowledge.
- Never duplicate canonical content.
- All generated pages must link back to the canonical slug.
- If conflicts exist, `/knowledge` always wins.

---

## FRONTMATTER CONTRACT (MANDATORY)

Every knowledge file MUST include:

```yaml
---
type: knowledge
canonical: true
topic: <topic-slug>
intent: informational
priority: primary
title: <page title>
slug: /<url-path>/
author: <author name>
last_updated: YYYY-MM-DD
---
```

---

### What to do now (2 steps)
1. Save this file as `KNOWLEDGE_FACTORY.md`.
2. Run Antigravity with **this file + your MD knowledge folder**.
   -   The agent will run with the **Autonomous Run** protocol, completing all manufacturing steps in one session.

When Antigravity finishes, you officially have a **knowledge manufacturing system**, not a blog pipeline.

If you want next:
- multi-topic batching
- vector DB ingest
- auto internal linker
- repo template generator

Say it and we extend the factory.
