extension 'br:mcr.microsoft.com/bicep/extensions/microsoftgraph/v1.0:1.0.0'

@description('Environment name')
param environment string

@description('Web app redirect URI')
param webRedirectUri string = 'http://localhost:4200'

@description('Mobile app redirect URI')
param mobileRedirectUri string = 'exp://localhost:19000'

var apiAppName = 'jatt-api-${environment}'
var webAppName = 'jatt-web-${environment}'
var mobileAppName = 'jatt-mobile-${environment}'

// API Application
resource apiApp 'Microsoft.Graph/applications@v1.0' = {
  displayName: apiAppName
  uniqueName: apiAppName
  api: {
    oauth2PermissionScopes: [
      {
        id: '96996324-4a58-450a-867c-6330193498d2' // Static GUID for the scope
        isEnabled: true
        type: 'User'
        value: 'access_as_user'
        adminConsentDescription: 'Allow the application to access jatt-api on behalf of the signed-in user.'
        adminConsentDisplayName: 'Access jatt-api'
        userConsentDescription: 'Allow the application to access jatt-api on your behalf.'
        userConsentDisplayName: 'Access jatt-api'
      }
    ]
  }
  identifierUris: [
    'api://jatt-api-${environment}'
  ]
}

// Web Application (SPA)
resource webApp 'Microsoft.Graph/applications@v1.0' = {
  displayName: webAppName
  uniqueName: webAppName
  spa: {
    redirectUris: [
      webRedirectUri
    ]
  }
  requiredResourceAccess: [
    {
      resourceAppId: apiApp.appId
      resourceAccess: [
        {
          id: '96996324-4a58-450a-867c-6330193498d2'
          type: 'Scope'
        }
      ]
    }
  ]
}

// Mobile Application (Native)
resource mobileApp 'Microsoft.Graph/applications@v1.0' = {
  displayName: mobileAppName
  uniqueName: mobileAppName
  publicClient: {
    redirectUris: [
      mobileRedirectUri
    ]
  }
  requiredResourceAccess: [
    {
      resourceAppId: apiApp.appId
      resourceAccess: [
        {
          id: '96996324-4a58-450a-867c-6330193498d2'
          type: 'Scope'
        }
      ]
    }
  ]
}

output apiClientId string = apiApp.appId
output webClientId string = webApp.appId
output mobileClientId string = mobileApp.appId
output apiScope string = 'api://${apiApp.appId}/access_as_user'
