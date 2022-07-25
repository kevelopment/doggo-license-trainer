import React, { createContext, useEffect, useState } from 'react';

export interface ThemeContextProps {
  isDark: boolean;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export type TrainingProviderProps = {
  children: any | any[];
};

const ThemeContextProvider = ({ children }: TrainingProviderProps) => {
  // need to set default false here, due to SSR
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggle = () => setIsDark(prev => {
    localStorage.setItem('doggo-is-dark', `${!prev}`);
    return !prev;
  });

  useEffect(() => {
    // check if the user already preferred a specific mode
    const wantsDark = localStorage.getItem('doggo-is-dark');
    if (wantsDark) {
      setIsDark(wantsDark === 'true');
      return;
    }

    // if not, check the OS preference
    const prefersDark = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
    if (!isDark && prefersDark) {
      setIsDark(true);
    }
  }, []);

  const value = {
    isDark,
    toggle
  }
  return <ThemeContext.Provider value={value}>{children(isDark)}</ThemeContext.Provider>;
};

export default ThemeContextProvider;
