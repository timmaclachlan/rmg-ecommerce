import { useState, useEffect } from "react";

export function useThemePersistence(
  defaultFamily = "blue",
  defaultMode = "light"
) {
  const [themeFamily, setThemeFamily] = useState(() => {
    return localStorage.getItem("themeFamily") || defaultFamily;
  });

  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") || defaultMode;
  });

  useEffect(() => {
    localStorage.setItem("themeFamily", themeFamily);
  }, [themeFamily]);

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const toggleThemeMode = () =>
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));

  return {
    themeFamily,
    setThemeFamily,
    themeMode,
    setThemeMode,
    toggleThemeMode,
  };
}
