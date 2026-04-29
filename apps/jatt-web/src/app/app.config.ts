import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalGuard,
  MsalGuardConfiguration,
  MsalInterceptor,
  MsalInterceptorConfiguration,
  MsalService,
} from '@azure/msal-angular';
import {
  BrowserCacheLocation,
  IPublicClientApplication,
  InteractionType,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';
import { JattApiClient } from '@just-another-task-tool/api-client';
import { appRoutes } from './app.routes';
import { ConfigService } from './config.service';

export function MSALInstanceFactory(
  configService: ConfigService,
): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: configService.clientId,
      authority: `https://login.microsoftonline.com/${configService.tenantId}`,
      redirectUri: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    system: {
      loggerOptions: {
        loggerCallback: (level: LogLevel, message: string) => {
          console.log(message);
        },
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(
  configService: ConfigService,
): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(configService.apiBaseUrl, [configService.apiScope]);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAppInitializer(async () => {
      const configService = inject(ConfigService);
      await configService.loadConfig();
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
      deps: [ConfigService],
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
      deps: [ConfigService],
    },
    MsalService,
    MsalGuard,
    {
      provide: JattApiClient,
      useFactory: (configService: ConfigService) =>
        new JattApiClient({ baseUrl: configService.apiBaseUrl }),
      deps: [ConfigService],
    },
  ],
};
