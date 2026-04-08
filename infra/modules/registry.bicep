@description('Name of the Azure Container Registry')
param name string

@description('Location for the registry')
param location string = resourceGroup().location

@description('SKU for the registry')
@allowed([
  'Basic'
  'Standard'
  'Premium'
])
param sku string = 'Basic'

resource registry 'Microsoft.ContainerRegistry/registries@2023-07-01' = {
  name: name
  location: location
  sku: {
    name: sku
  }
  properties: {
    adminUserEnabled: true
  }
}

output loginServer string = registry.properties.loginServer
output name string = registry.name
