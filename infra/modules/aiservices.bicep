@description('Name of the AI Services resource')
param name string

@description('Location for the AI Services resource')
param location string = resourceGroup().location

@description('SKU for the AI Services resource')
param sku string = 'F0'

resource aiServices 'Microsoft.CognitiveServices/accounts@2023-05-01' = {
  name: name
  location: location
  kind: 'CognitiveServices'
  sku: {
    name: sku
  }
  properties: {
    customSubDomainName: name
    publicNetworkAccess: 'Enabled'
  }
}

output endpoint string = aiServices.properties.endpoint
output id string = aiServices.id
output name string = aiServices.name
output primaryKey string = aiServices.listKeys().key1
