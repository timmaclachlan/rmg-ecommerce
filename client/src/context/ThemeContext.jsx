import { createContext, useContext } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { themes } from "../themes";
import { useThemePersistence } from "../hooks/useThemePersistence";

const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
  const { themeFamily, setThemeFamily, themeMode, toggleThemeMode } =
    useThemePersistence();

  const theme = themes[themeFamily][themeMode];

  return (
    <ThemeContext.Provider
      value={{ themeMode, themeFamily, toggleThemeMode, setThemeFamily }}
    >
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
