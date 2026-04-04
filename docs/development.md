# Quick Start Development Guide

This guide covers running the Task Tool suite locally on your machine.

## Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download)
- [Azure Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local)
- Azure Cosmos DB Emulator (Optional, if you wish to run completely offline without the free tier cloud DB)
- [VS Code](https://code.visualstudio.com/) with C# extensions.

## Repository Structure

This is an Nx monorepo. All applications live under the `apps/` directory:

- `apps/jatt-web` - The Angular web application (static SPA).
- `apps/jatt-mobile` - The React Native mobile application.
- `apps/jatt-api` - The Azure Functions API (isolated worker model).

## Running the API (Azure Functions)

Navigate to the API folder and start the function runtime.

```bash
cd apps/jatt-api
func start
```

The `local.settings.json` file is already configured for local development with:

- `AzureWebJobsStorage`: Uses local storage emulator
- `CosmosDbConnectionString`: Defaults to Cosmos DB emulator

## Running the Web Frontend

The Angular web app is built and served using Nx.

```bash
# From the repository root
npx nx serve jatt-web
```

Then navigate to `http://localhost:4200` in your browser.

### Angular-specific commands

```bash
npx nx build jatt-web         # Production static build (output to dist/apps/jatt-web)
npx nx build jatt-web --configuration=development  # Development build
npx nx test jatt-web          # Run unit tests
npx nx lint jatt-web          # Run linting
```

## Running the Mobile App

The React Native app is managed through the Nx workspace. Ensure you have Node.js installed.

```bash
# From the repository root
npx nx start jatt-mobile          # Start Metro bundler
npx nx run-android jatt-mobile    # Run on Android
npx nx run-ios jatt-mobile        # Run on iOS
```

For additional commands, run `npx nx show project jatt-mobile --web`.
