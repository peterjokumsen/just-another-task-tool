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
param runtimeVersion string = '10.0'

@description('App Insights instrumentation key')
param appInsightsInstrumentationKey string = ''

resource functionsAppServicePlan 'Microsoft.Web/serverfarms@2024-04-01' = {
  name: '${name}-asp'
  location: location
  sku: {
    name: 'FC1'
    tier: 'FlexConsumption'
  }
  kind: 'linux'
  properties: {
    reserved: true
  }
}

resource storageAccount 'Microsoft.Storage/storageAccounts@2024-01-01' existing = {
  name: storageAccountName
}

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2023-05-01' = {
  parent: storageAccount
  name: 'default'
}

resource container 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: blobService
  name: '${name}-container'
  properties: {
    publicAccess: 'None'
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
    functionAppConfig: {
      deployment: {
        storage: {
          type: 'BlobContainer'
          value: '${storageAccount.properties.primaryEndpoints.blob}${container.name}'
          authentication: {
            type: 'StorageAccountConnectionString'
            storageAccountConnectionStringName: 'AzureWebJobsStorage'
          }
        }
      }
      runtime: {
        name: runtime
        version: runtimeVersion
      }
      scaleAndConcurrency: {
        instanceMemoryMB: 512
        maximumInstanceCount: 5
      }
    }
    siteConfig: {
      appSettings: [
        {
          name: 'AzureWebJobsStorage'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccountName};EndpointSuffix=${environment().suffixes.storage};AccountKey=${storageAccount.listKeys().keys[0].value}'
        }
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: appInsightsInstrumentationKey
        }
        /*{
          name: 'CosmosDbConnectionString'
          value: cosmosDbConnectionString
        }
        {
          name: 'CosmosDbDatabaseId'
          value: cosmosDbDatabaseId
        }*/
      ]
    }
    httpsOnly: true
  }
}

output id string = functionsApp.id
output name string = functionsApp.name
output url string = 'https://${functionsApp.properties.defaultHostName}'
output principalId string = functionsApp.identity.principalId
