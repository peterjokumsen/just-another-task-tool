@description('Static web app name')
param name string

@description('Azure region')
param location string

@description('Functions API key for authentication')
@secure()
param apiKey string

resource staticWebApp 'Microsoft.Web/staticSites@2024-04-01' = {
  name: name
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    repositoryUrl: ''
    branch: ''
    buildProperties: {
      appLocation: 'dist/apps/jatt-web/browser'
      apiLocation: 'apps/jatt-api'
      outputLocation: ''
      appBuildCommand: 'npx nx build jatt-web'
      apiBuildCommand: ''
      staticWebAppInventoryConfiguration: {
        apiPassword: apiKey
      }
    }
  }
}

output id string = staticWebApp.id
output name string = staticWebApp.name
output url string = staticWebApp.properties.defaultHostname
output defaultHostName string = 'https://${staticWebApp.properties.defaultHostname}'
