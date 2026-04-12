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
