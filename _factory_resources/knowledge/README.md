# /knowledge

This directory is the **Authoritative Core** of the system.

## ✍️ Rules for Writing Knowledge
1. **Markdown Only**: All files must use the `.md` extension.
2. **Mandatory Frontmatter**: Every file MUST start with the YAML block defined in `KNOWLEDGE_FACTORY.md`.
3. **Canonical Truth**: If a fact is not here, it doesn't exist in the generated site.

## 📁 File Template
Create a new file (e.g., `topic-slug.md`) with this structure:

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
last_updated: 2026-01-30
---
# Main Heading

Your authoritative content here...
```
