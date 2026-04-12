@description('Name of the Container App')
param name string

@description('Name of the Container App Environment')
param environmentName string

@description('Location for the resources')
param location string = resourceGroup().location

@description('Name of the registry')
param registryName string

@description('Login server for the registry')
param registryLoginServer string

@description('AI Services endpoint')
param aiServicesEndpoint string

@description('AI Services resource name')
param aiServicesName string

@description('App Insights connection string')
param appInsightsConnectionString string = ''

@description('Log Analytics workspace name (from shared workspace)')
param logAnalyticsWorkspaceName string = ''

resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2022-10-01' existing = {
  name: logAnalyticsWorkspaceName
}

resource environment 'Microsoft.App/managedEnvironments@2023-05-01' = {
  name: environmentName
  location: location
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: logAnalytics.properties.customerId
        sharedKey: logAnalytics.listKeys().primarySharedKey
      }
    }
  }
}

resource containerApp 'Microsoft.App/containerApps@2023-05-01' = {
  name: name
  location: location
  properties: {
    managedEnvironmentId: environment.id
    configuration: {
      ingress: {
        external: true
        targetPort: 8080
      }
      registries: [
        {
          server: registryLoginServer
          username: listCredentials(resourceId('Microsoft.ContainerRegistry/registries', registryName), '2023-01-01-preview').username
          passwordSecretRef: 'registry-password'
        }
      ]
      secrets: [
        {
          name: 'registry-password'
          value: listCredentials(resourceId('Microsoft.ContainerRegistry/registries', registryName), '2023-01-01-preview').passwords[0].value
        }
        {
          name: 'ai-services-key'
          value: listKeys(resourceId('Microsoft.CognitiveServices/accounts', aiServicesName), '2023-05-01').key1
        }
      ]
    }
    template: {
      containers: [
        {
          name: name
          image: 'mcr.microsoft.com/azuredocs/containerapps-helloworld:latest'
          env: [
            {
              name: 'AI_SERVICES_ENDPOINT'
              value: aiServicesEndpoint
            }
            {
              name: 'AI_SERVICES_KEY'
              secretRef: 'ai-services-key'
            }
            {
              name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
              value: appInsightsConnectionString
            }
          ]
          resources: {
            cpu: json('0.25')
            memory: '0.5Gi'
          }
        }
      ]
    }
  }
}

output url string = containerApp.properties.configuration.ingress.fqdn
output name string = containerApp.name
