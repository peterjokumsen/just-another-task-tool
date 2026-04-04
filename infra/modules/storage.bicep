@description('Storage account name')
param name string

@description('Azure region')
param location string

resource storageAccount 'Microsoft.Storage/storageAccounts@2024-01-01' = {
  name: name
  location: location
  kind: 'StorageV2'
  sku: {
    name: 'Standard_LRS'
  }
  properties: {
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
  }
}

output id string = storageAccount.id
output name string = storageAccount.name
output primaryConnectionString string = storageAccount.listKeys().connectionStrings[0]
output primaryBlobEndpoint string = storageAccount.properties.primaryEndpoints.blob
