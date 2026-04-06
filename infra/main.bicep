targetScope = 'resourceGroup'

@description('Base name for all resources')
param baseName string

@description('Environment (dev, staging, prod)')
@allowed(['dev', 'staging', 'prod'])
param environment string = 'dev'

@description('Azure region for resources')
param location string = resourceGroup().location

@description('Cosmos DB free tier setting')
param enableFreeTier bool = true

var uniqueSuffix = '${environment}-${substring(uniqueString(baseName), 0, 6)}'
var resourcePrefix = 'jatt-${uniqueSuffix}'

module cosmosDb 'modules/cosmosdb.bicep' = {
  name: 'cosmosdb-deployment'
  params: {
    name: 'cosmos-${resourcePrefix}'
    location: location
    enableFreeTier: enableFreeTier
    databaseName: 'jatt-db'
  }
}

module storage 'modules/storage.bicep' = {
  name: 'storage-deployment'
  params: {
    name: 'st${resourcePrefix}'
    location: location
  }
}

module functions 'modules/functions.bicep' = {
  name: 'functions-deployment'
  params: {
    name: 'func-${resourcePrefix}'
    location: location
    storageAccountName: storage.outputs.name
    // cosmosDbConnectionString: 
    // cosmosDbDatabaseId: cosmosDb.outputs.databaseId
    runtime: 'dotnet-isolated'
    runtimeVersion: '10'
  }
}

module staticWebApp 'modules/staticwebapp.bicep' = {
  name: 'staticwebapp-deployment'
  params: {
    name: 'stapp-${resourcePrefix}'
    location: location
  }
}

output resourceGroup string = resourceGroup().name
output cosmosDbName string = cosmosDb.outputs.name
output functionsName string = functions.outputs.name
output functionsUrl string = functions.outputs.url
output staticWebAppName string = staticWebApp.outputs.name
output staticWebAppUrl string = staticWebApp.outputs.url
