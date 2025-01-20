import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Theme } from '../interface/Theme';

interface ThemeContextType {
  themeName: Theme;
  setTheme: (themeName: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function MainThemeProvider({ children }: { children: ReactNode }) {
  const initialTheme = (localStorage.getItem('preferredTheme') as Theme) || 'light';

  const [themeName, setThemeName] = useState<Theme>(initialTheme);

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
