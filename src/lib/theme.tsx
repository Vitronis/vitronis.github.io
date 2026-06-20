import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { VitalType } from './vitals';

// Light/dark theme with manual toggle. Default: light (per design decision).
// Sets data-theme on <html> so design-system.css variables switch.

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = 'vitronis-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    return saved === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const value: ThemeContextValue = {
    theme,
    toggle: () => setThemeState((t) => (t === 'light' ? 'dark' : 'light')),
    setTheme: setThemeState,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

// Per-vital accent colors — used for icon chips, tile glows and chart strokes.
export const VITAL_COLOR: Record<VitalType, string> = {
  heart: '#F5455F', // red
  'blood-pressure': '#2E6BFF', // blue
  oxygen: '#00B5C8', // cyan
  temperature: '#FF9F45', // amber
  ekg: '#1FB87D', // green
  calories: '#FF7A3D', // orange
  'blood-sugar': '#2E7D5B', // dark green
};

// Status -> CSS variable token, so colors follow the active theme.
export const STATUS_VAR: Record<'normal' | 'warning' | 'emergency', string> = {
  normal: 'var(--good)',
  warning: 'var(--warn)',
  emergency: 'var(--bad)',
};
