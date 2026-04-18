import {
  Injectable,
  signal,
  effect,
  inject,
  InjectionToken,
  DOCUMENT,
} from '@angular/core';
import {
  DARK_THEME,
  LIGHT_THEME,
  BASE_TOKENS,
  ThemeTokens,
} from '@just-another-task-tool/shared-styles';

export const THEMES = new InjectionToken<{
  light: ThemeTokens;
  dark: ThemeTokens;
}>('THEMES');

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themes = inject(THEMES, { optional: true }) ?? {
    light: LIGHT_THEME,
    dark: DARK_THEME,
  };
  private theme = signal<'light' | 'dark'>(this.getInitialTheme());

  constructor() {
    effect(() => {
      const currentTheme = this.theme();
      this.applyTheme(this.themes[currentTheme]);
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
    // Apply base tokens (spacing, etc)
    this.addVariables(BASE_TOKENS.spacing, 'spacing');
    this.addVariables(BASE_TOKENS.typography, 'typography');

    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'dark'; // Default to dark as per premium design
  }

  private addVariables(values: { [id: string]: string }, prefix?: string) {
    if (prefix && !prefix.endsWith('-')) prefix = `${prefix}-`;
    for (const [key, value] of Object.entries(values)) {
      const cssVarName = `--jatt-${prefix ?? ''}${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      document.documentElement.style.setProperty(cssVarName, value);
    }
  }

  private applyTheme(tokens: ThemeTokens) {
    // Apply colors
    this.addVariables(tokens.colors);
  }
}
