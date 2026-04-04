# Azure Environment Setup

This project uses resources designed for low-to-zero cost during development. Below is how to set up the necessary cloud footprint on Azure.

## Prerequisites

- An active Azure Subscription
- Azure CLI installed locally (`az login`)

## 1. Resource Group

Create a dedicated Resource Group to hold everything logically together.

```bash
az group create --name rg-tasktool-dev --location eastus
```

## 2. Cosmos DB (Free Tier Account)

> **Note**: You are only allowed ONE free tier Cosmos DB account per subscription.

Provision a Cosmos DB NoSQL account:

```bash
az cosmosdb create \
    --name cosmos-tasktool-dev \
    --resource-group rg-tasktool-dev \
    --enable-free-tier true \
    --default-consistency-level Session
```

## 3. Azure Function App (Serverless Consumption)

First, you need a storage account for the Function App.

```bash
az storage account create \
    --name sttasktoolfuncdev \
    --resource-group rg-tasktool-dev \
    --sku Standard_LRS
```

Then create the Function App on the Consumption Plan:

```bash
az functionapp create \
    --name func-tasktool-api-dev \
    --resource-group rg-tasktool-dev \
    --storage-account sttasktoolfuncdev \
    --consumption-plan-location eastus \
    --functions-version 4 \
    --os-type Linux \
    --runtime dotnet-isolated \
    --runtime-version 8
```

## 4. Azure Static Web Apps (Free Tier)

To host the Angular static web app:

```bash
az staticwebapp create \
    --name stapp-tasktool-web-dev \
    --resource-group rg-tasktool-dev \
    --sku Free \
    --location eastus2
```

> **Note**: Build configuration for Azure Static Web Apps should use:
>
> - Build command: `npx nx build jatt-web`
> - App location: `dist/apps/jatt-web`

## 5. Configure Secrets

Ensure your Azure Function connects to Cosmos DB by giving it the connection string.

```bash
# Retrieve Connection String
az cosmosdb keys list --type connection-strings --name cosmos-tasktool-dev --resource-group rg-tasktool-dev

# Set App Setting on Function App
az functionapp config appsettings set \
    --name func-tasktool-api-dev \
    --resource-group rg-tasktool-dev \
    --settings "CosmosDbConnectionString=<YOUR_CONNECTION_STRING>"
```
