@description('Static web app name')
param name string

@description('Azure region')
param location string

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
      apiLocation: ''
      outputLocation: ''
      apiBuildCommand: ''
      skipGithubActionWorkflowGeneration: true
    }
  }
}

output id string = staticWebApp.id
output name string = staticWebApp.name
output url string = staticWebApp.properties.defaultHostname
output defaultHostName string = 'https://${staticWebApp.properties.defaultHostname}'
