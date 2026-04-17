import { Injectable, signal, effect } from '@angular/core';
import {
  DARK_THEME,
  LIGHT_THEME,
  BASE_TOKENS,
  ThemeTokens,
} from '@just-another-task-tool/shared-styles';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme = signal<'light' | 'dark'>(this.getInitialTheme());

  constructor() {
    effect(() => {
      const currentTheme = this.theme();
      this.applyTheme(currentTheme === 'light' ? LIGHT_THEME : DARK_THEME);
      document.documentElement.setAttribute('data-theme', currentTheme);
    });
  }

  toggleTheme() {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }

  isDark() {
    return this.theme() === 'dark';
  }

  private getInitialTheme(): 'light' | 'dark' {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'dark'; // Default to dark as per premium design
  }

  private applyTheme(tokens: ThemeTokens) {
    const root = document.documentElement;

    // Apply colors
    Object.entries(tokens.colors).forEach(([key, value]) => {
      const cssVarName = `--jatt-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVarName, value);
    });

    // Apply base tokens (spacing, etc)
    Object.entries(BASE_TOKENS.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--jatt-spacing-${key}`, value);
    });
  }
}
