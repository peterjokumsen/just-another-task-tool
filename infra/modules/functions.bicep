@description('Function app name')
param name string

@description('Azure region')
param location string

@description('Storage account name')
param storageAccountName string

/*
@description('Cosmos DB connection string')
@secure()
param cosmosDbConnectionString string

@description('Cosmos DB database ID')
param cosmosDbDatabaseId string
*/

@description('Functions runtime')
param runtime string = 'dotnet-isolated'

@description('Runtime version')
param runtimeVersion string = '8'

resource functionsAppServicePlan 'Microsoft.Web/serverfarms@2024-04-01' = {
  name: '${name}-asp'
  location: location
  sku: {
    name: 'Y1'
    tier: 'Dynamic'
  }
  kind: 'linux'
  properties: {
    reserved: true
    targetWorkerCount: 1
    targetWorkerSizeId: 0
  }
}

resource functionsApp 'Microsoft.Web/sites@2024-04-01' = {
  name: name
  location: location
  kind: 'functionapp,linux'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: functionsAppServicePlan.id
    siteConfig: {
      linuxFxVersion: 'DOTNET|${runtimeVersion}'
      appSettings: [
        {
          name: 'AzureWebJobsStorage'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccountName};EndpointSuffix=${environment().suffixes.storage};AccountKey=${storageAccount.listKeys().keys[0].value}'
        }
        {
          name: 'FUNCTIONS_WORKER_RUNTIME'
          value: runtime
        }
        /*{
          name: 'CosmosDbConnectionString'
          value: cosmosDbConnectionString
        }
        {
          name: 'CosmosDbDatabaseId'
          value: cosmosDbDatabaseId
        }*/
        {
          name: 'WEBSITE_RUN_FROM_PACKAGE'
          value: '1'
        }
        {
          name: 'WEBSITE_ENABLE_SYNC_UPDATE_SITE'
          value: 'true'
        }
      ]
    }
    httpsOnly: true
  }
  dependsOn: [
    storageAccount
  ]
}

resource storageAccount 'Microsoft.Storage/storageAccounts@2024-01-01' existing = {
  name: storageAccountName
}

output id string = functionsApp.id
output name string = functionsApp.name
output url string = 'https://${functionsApp.properties.defaultHostName}'
output principalId string = functionsApp.identity.principalId
