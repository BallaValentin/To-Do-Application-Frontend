import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeMode } from '../interface/ThemeMode';

interface ThemeContextType {
  themeName: ThemeMode;
  setTheme: (themeName: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function MainThemeProvider({ children }: { children: ReactNode }) {
  const initialTheme = (localStorage.getItem('preferredTheme') as ThemeMode) || 'light';

  const [themeName, setThemeName] = useState<ThemeMode>(initialTheme);

  useEffect(() => {
    localStorage.setItem('preferredTheme', themeName);
  }, [themeName]);

  const contextValue = useMemo(
    () => ({
      themeName,
      setTheme: setThemeName,
    }),
    [themeName],
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
