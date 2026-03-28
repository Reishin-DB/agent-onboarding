# Deploying Agent Onboarding to Your Workspace

## Prerequisites

- Databricks CLI installed and configured
- A Databricks workspace with **Apps** enabled

## Quick Deploy

### 1. Clone the repo

```bash
git clone https://github.com/Reishin-DB/agent-onboarding.git
cd agent-onboarding
```

### 2. Update `databricks.yml` targets

Edit the `targets` section to point to your workspace:

```yaml
targets:
  dev:
    workspace:
      host: https://YOUR-WORKSPACE.cloud.databricks.com
      profile: YOUR-PROFILE
```

### 3. Deploy

```bash
databricks apps create agent-onboarding --description "Agent Onboarding" --profile=YOUR-PROFILE
databricks apps deploy agent-onboarding --source-code-path /Workspace/Users/<your-email>/agent-onboarding --profile=YOUR-PROFILE
```

### 4. Open the app

The deploy command prints the app URL.
