import { Injectable } from '@angular/core';

export interface AppConfig {
  apiBaseUrl: string;
  clientId: string;
  tenantId: string;
  apiScope: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: AppConfig | undefined;

  async loadConfig(): Promise<void> {
    try {
      const response = await fetch('/config.json');
      if (!response.ok) {
        throw new Error(`Could not load config.json: ${response.statusText}`);
      }
      this.config = await response.json();
      console.log('App configuration loaded:', this.config);
    } catch (error) {
      console.error('Failed to load app configuration:', error);
      // Fallback to defaults if loading fails
      this.config = {
        apiBaseUrl: 'http://localhost:7071',
        clientId: '',
        tenantId: '',
        apiScope: '',
      };
    }
  }

  get apiBaseUrl(): string {
    return this.config?.apiBaseUrl ?? 'http://localhost:7071';
  }

  get clientId(): string {
    return this.config?.clientId ?? '';
  }

  get tenantId(): string {
    return this.config?.tenantId ?? '';
  }

  get apiScope(): string {
    return this.config?.apiScope ?? '';
  }
}
