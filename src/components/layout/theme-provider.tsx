"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
  enableSystem?: boolean;
  enableColorScheme?: boolean;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({ 
  children, 
  defaultTheme = "system", 
  ...props 
}: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      defaultTheme={defaultTheme} 
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}