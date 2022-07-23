import React, { createContext, useState } from 'react';
import { useDarkMode } from "usehooks-ts";

export interface ThemeContextProps {
  isDark: boolean;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export type TrainingProvierProps = {
  children: any | any[];
};

const ThemeContextProvider = ({ children }: TrainingProvierProps) => {
  const {isDarkMode: isDark, toggle} = useDarkMode();

  const value = {
    isDark,
    toggle
  }
  return <ThemeContext.Provider value={value}>{children(isDark)}</ThemeContext.Provider>;
};

export default ThemeContextProvider;
