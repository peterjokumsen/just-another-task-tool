export interface ThemeTokens {
  colors: {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
  };
}

export const BASE_TOKENS = {
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  typography: {
    fontFamily: "'Fira Code', monospace",
    fontSizeBase: '16px',
    fontWeightRegular: '400',
    fontWeightMedium: '500',
    fontWeightBold: '700',
  },
};

export const LIGHT_THEME: ThemeTokens = {
  colors: {
    background: '#f8fafc',
    surface: '#ffffff',
    primary: '#a855f7',
    secondary: '#3b82f6',
    textPrimary: '#0f172a',
    textSecondary: '#64748b',
    border: 'rgba(0, 0, 0, 0.05)',
  },
};

export const DARK_THEME: ThemeTokens = {
  colors: {
    background: '#0b0e14',
    surface: 'rgba(255, 255, 255, 0.03)',
    primary: '#a855f7',
    secondary: '#3b82f6',
    textPrimary: '#ffffff',
    textSecondary: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.05)',
  },
};
