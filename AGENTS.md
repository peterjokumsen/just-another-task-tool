# AGENTS.md

By default use `caveman` skill.

## Dev Commands

```bash
# Web (Angular)
npx nx serve jatt-web
npx nx build jatt-web
npx nx test jatt-web
npx nx lint jatt-web

# Mobile (React Native)
npx nx start jatt-mobile
npx nx run-ios jatt-mobile
npx nx run-android jatt-mobile

# API (Azure Functions .NET)
cd apps/jatt-api && func start
```

## Key Constraints

- **Package manager**: pnpm. Not npm/yarn.
- **Monorepo tool**: Nx. Always use `npx nx <target> <project>`.
- **Test runners**: Angular = Vitest, React Native = Jest, API = xUnit.
- **CI**: Node.js 24, .NET 10.0.x.
- **Lint**: `@nx/eslint` (eslint.config.mjs root).

## App Boundaries

| App             | Framework              | Deploy                |
| --------------- | ---------------------- | --------------------- |
| jatt-web        | Angular SPA            | Azure Static Web Apps |
| jatt-mobile     | React Native           | iOS/Android           |
| jatt-api        | Azure Functions (.NET) | Azure Functions       |
| jatt-ai-service | Docker                 | Azure Container Apps  |

## Infra

- **CI workflow**: `.github/workflows/pipeline.yml` (main branch)
- **IaC**: `infra/main.bicep`
- **Resource group**: rg-jatt-dev, region: westus2

## Docs

`docs/` folder: development.md, architecture.md, azure-setup.md, ai-features.md

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->
