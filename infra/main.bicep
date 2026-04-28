targetScope = 'resourceGroup'

@description('Base name for all resources')
param baseName string = 'jatt'

@description('Environment (pr, dev, staging, prod)')
@allowed(['pr', 'dev', 'staging', 'prod'])
param environment string = 'dev'

@description('Azure region for resources')
param location string = resourceGroup().location

@description('Cosmos DB free tier setting')
param enableFreeTier bool = true

@description('Timestamp of the current deployment')
param timestamp string

var resourceSuffix = '${baseName}-${environment}'

module auth 'modules/auth.bicep' = {
  name: 'auth-deployment-${timestamp}'
  params: {
    environment: environment
  }
}

module appInsights 'modules/appinsights.bicep' = {
  name: 'appinsights-deployment-${timestamp}'
  params: {
    name: 'ai-${resourceSuffix}'
    location: location
  }
}

module cosmosDb 'modules/cosmosdb.bicep' = {
  name: 'cosmosdb-deployment-${timestamp}'
  params: {
    name: 'cosmos-${resourceSuffix}'
    location: location
    enableFreeTier: enableFreeTier
    databaseName: 'jatt-db'
  }
}

module storage 'modules/storage.bicep' = {
  name: 'storage-deployment-${timestamp}'
  params: {
    name: 'st${replace(resourceSuffix, '-', '')}'
    location: location
  }
}

module functions 'modules/functions.bicep' = {
  name: 'functions-deployment-${timestamp}'
  params: {
    name: 'func-${resourceSuffix}'
    location: location
    storageAccountName: storage.outputs.name
    // cosmosDbConnectionString:
    // cosmosDbDatabaseId: cosmosDb.outputs.databaseId
    runtime: 'dotnet-isolated'
    runtimeVersion: '10.0'
    appInsightsInstrumentationKey: appInsights.outputs.instrumentationKey
    appSettings: {
      AzureAd__Instance: 'https://login.microsoftonline.com/'
      AzureAd__TenantId: tenant().tenantId
      AzureAd__ClientId: auth.outputs.apiClientId
      AzureAd__Audience: auth.outputs.apiClientId
    }
  }
}

module staticWebApp 'modules/staticwebapp.bicep' = {
  name: 'staticwebapp-deployment-${timestamp}'
  params: {
    name: 'stapp-${resourceSuffix}'
    location: location
  }
}

module registry 'modules/registry.bicep' = {
  name: 'registry-deployment-${timestamp}'
  params: {
    name: 'cr${replace(resourceSuffix, '-', '')}'
    location: location
  }
}

module aiServices 'modules/aiservices.bicep' = {
  name: 'aiservices-deployment-${timestamp}'
  params: {
    name: 'ai-${resourceSuffix}'
    location: location
    sku: 'S0'
  }
}

module containerApp 'modules/containerapp.bicep' = {
  name: 'containerapp-deployment-${timestamp}'
  params: {
    name: 'aca-${resourceSuffix}'
    environmentName: 'cae-${resourceSuffix}'
    location: location
    registryName: registry.outputs.name
    registryLoginServer: registry.outputs.loginServer
    aiServicesEndpoint: aiServices.outputs.endpoint
    aiServicesName: aiServices.outputs.name
    appInsightsConnectionString: appInsights.outputs.connectionString
    logAnalyticsWorkspaceName: appInsights.outputs.workspaceName
  }
}

output resourceGroup string = resourceGroup().name
output appInsightsInstrumentationKey string = appInsights.outputs.instrumentationKey
output appInsightsConnectionString string = appInsights.outputs.connectionString
output cosmosDbName string = cosmosDb.outputs.name
output functionsName string = functions.outputs.name
output functionsUrl string = functions.outputs.url
output staticWebAppName string = staticWebApp.outputs.name
output staticWebAppUrl string = staticWebApp.outputs.url
output containerRegistryName string = registry.outputs.name
output aiServicesEndpoint string = aiServices.outputs.endpoint
output containerAppUrl string = containerApp.outputs.url
