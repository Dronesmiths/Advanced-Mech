# 🏭 Knowledge Factory: Canonical Source System

This directory contains the **Knowledge Manufacturing System**. It implements a "knowledge-first" architecture where structured Markdown files in `/knowledge` serve as the single source of truth for all SEO, schema, and AI-generated outputs.

## 🏗️ Architecture Overview

The system is designed to be **canonical and immutable**. Instead of manual content creation, we manufacture specialized outputs from a central knowledge base.

### Directory Structure
- `/knowledge/`: **Authoritative Source.** Contains the canonical `.md` files. This is where you write.
- `/scripts/`: **Manufacturing Engine.** Python/Node scripts that transform knowledge into artifacts.
- `/public/`: **Generated Output.** SEO HTML, JSON-LD schema, and RAG-ready chunks.
- `KNOWLEDGE_FACTORY.md`: **The System Constitution.** Defines the rules and frontmatter contracts.
- `ANTIGRAVITY_BOOTSTRAP.md`: **Agent Instruction.** The prompt used to initialize an AI agent to work with this factory.

## 🚀 Getting Started

1. **Write Knowledge**: Add a new `.md` file to `/knowledge/` following the [Frontmatter Contract](KNOWLEDGE_FACTORY.md#frontmatter-contract-mandatory).
2. **Run the Build**:
   ```bash
   npm run knowledge:build
   ```
3. **Verify Artifacts**: Check the `/public/` directory for the generated SEO pages and schema.

## 📜 Principles
1. **Never Duplicate**: Knowledge is only written once in `/knowledge`.
2. **Never Paraphrase**: AI outputs must adhere strictly to the canonical source.
3. **Automated Enforcement**: Builds fail if the frontmatter contract is broken.

---
*Created by Antigravity for the Website Factory Project.*
