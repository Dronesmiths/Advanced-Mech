# How to Port This "Website Factory" to a New Project

**Goal**: Move the "Brain" of this project to a new client repository instantly.

## The Transfer Kit
To start a new site, you only need to copy two folders from this repository:
1.  **`_factory_resources/`** (The Strategy & Documentation)
2.  **`scripts/`** (The Automation Tools)

## Quickstart Instructions

### 1. Initialize New Repo
Create your new folder and git repository:
```bash
mkdir New_Client_Repo
cd New_Client_Repo
git init
```

### 2. Copy the Factory
Copy the two core folders from the template source into the new root:
```bash
cp -r ../[TEMPLATE_SOURCE_DIR]/_factory_resources .
cp -r ../[TEMPLATE_SOURCE_DIR]/scripts .
```

### 3. The "Day 0" Setup
Before asking the AI to do anything, update the *Identity* of the new project:
1.  Open **`_factory_resources/CLIENT_INTAKE.md`**.
2.  Fill in the **Business Name**, **Phone**, **City**, and **New S3 Bucket Name**.
3.  (Optional) Update `COMPETITIVE_ADVANTAGE.md` with the new client's top 5 selling points.

### 4. Activate the Agent
Paste this command to your AI Agent:
> "Initiate Website Factory Workflow: Run Step 0 of `_factory_resources/DEPLOYMENT_ORDER.md`."

The agent will read your updated intake file and start the rebranding process automatically.

---
**Note on Scripts**: The scripts in `scripts/` are robust but may contain legacy strings. The Agent's first task in **Step 2** of the deployment order will be to sanitize these scripts for the new client.
