import { Injectable, signal, effect, inject, InjectionToken, DOCUMENT } from '@angular/core';
import {
  DARK_THEME,
  LIGHT_THEME,
  BASE_TOKENS,
  ThemeTokens,
} from '@just-another-task-tool/shared-styles';

export const THEMES = new InjectionToken<{ light: ThemeTokens, dark: ThemeTokens }>('THEMES');

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private themes = inject(THEMES, { optional: true }) ?? {
    light: LIGHT_THEME,
    dark: DARK_THEME,
  };
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
    const root = this.document.documentElement;

    // Apply colors
    Object.entries(tokens.colors).forEach(([key, value]) => {
      const cssVarName = `--jatt-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVarName, value);
    });

    // Apply base tokens (spacing, etc)
    Object.entries(BASE_TOKENS.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--jatt-spacing-${key}`, value);
    });

    Object.entries(BASE_TOKENS.typography).forEach(([key, value]) => {
      root.style.setProperty(`--jatt-typography-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
    });
  }
}
