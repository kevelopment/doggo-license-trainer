import React, { createContext, useState } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextProps {
  theme: Theme;
  switchTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export type TrainingProvierProps = {
  children: any | any[];
};

const ThemeContextProvider = ({ children }: TrainingProvierProps) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const switchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  const value = {
    theme,
    switchTheme
  }
  return <ThemeContext.Provider value={value}>{children(theme)}</ThemeContext.Provider>;
};

export default ThemeContextProvider;
