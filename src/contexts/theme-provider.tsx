
"use client"

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = "dark" | "light";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// Initialize with a default that will be immediately updated by the provider's props or localStorage
const initialState: ThemeProviderState = {
  theme: "light", 
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "eternal-devotion-theme", // Matched to RootLayout
  ...props
}: ThemeProviderProps) {
  // Step 1: Initialize theme state with defaultTheme. 
  // localStorage will only be checked on the client-side after mount.
  const [theme, setThemeInternal] = useState<Theme>(defaultTheme);

  // Step 2: Effect to load theme from localStorage on initial client mount.
  // This runs ONLY on the client, after the component has mounted.
  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    if (storedTheme && storedTheme !== theme) { // Only set if different to avoid unnecessary re-render
      setThemeInternal(storedTheme);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [storageKey]); // Removed theme from deps to ensure it only loads from localStorage once

  // Step 3: Effect to update DOM (<html> class) and localStorage when theme actually changes.
  // This also runs only on the client.
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  // Wrapper for setTheme to be exposed via context
  const setTheme = (newTheme: Theme) => {
    setThemeInternal(newTheme);
  };

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
