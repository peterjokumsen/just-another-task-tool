import { Injectable } from '@angular/core';

export interface AppConfig {
  apiBaseUrl: string;
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
      };
    }
  }

  get apiBaseUrl(): string {
    return this.config?.apiBaseUrl ?? 'http://localhost:7071';
  }
}
