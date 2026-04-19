import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { ConfigService } from './config.service';
import { JattApiClient } from '@just-another-task-tool/api-client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideAppInitializer(async () => {
      const configService = inject(ConfigService);
      await configService.loadConfig();
    }),
    {
      provide: JattApiClient,
      useFactory: (configService: ConfigService) =>
        new JattApiClient({ baseUrl: configService.apiBaseUrl }),
      deps: [ConfigService],
    },
  ],
};
