// themes.js
import { createTheme } from "@mui/material/styles";

const basePalette = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
};

export const themes = {
  blue: {
    light: createTheme({
      ...basePalette,
      palette: {
        mode: "light",
        primary: { main: "#90caf9" },
        secondary: { main: "#f48fb1" },
      },
    }),
    dark: createTheme({
      ...basePalette,
      palette: {
        mode: "dark",
        primary: {
          main: "#5893df",
        },
        secondary: {
          main: "#2ec5d3",
        },
        background: {
          default: "#192231",
          paper: "#24344d",
        },
      },
    }),
  },
  materialui: {
    light: createTheme({
      ...basePalette,
      palette: {
        mode: "light",
        primary: {
          main: "#1976d2",
        },
        secondary: {
          main: "rgb(220, 0, 78)",
        },
        background: {
          default: "#fff",
          paper: "#fff",
        },
      },
    }),
    dark: createTheme({
      ...basePalette,
      palette: {
        mode: "dark",
        primary: {
          main: "#90caf9",
        },
        secondary: {
          main: "#f48fb1",
        },
        background: {
          default: "#212121",
          paper: "#424242",
        },
      },
    }),
  },
  green: {
    light: createTheme({
      ...basePalette,
      palette: {
        mode: "light",
        primary: { main: "#81c784" },
        secondary: { main: "#aed581" },
      },
    }),
    dark: createTheme({
      ...basePalette,
      palette: {
        mode: "dark",
        primary: { main: "#4caf50" },
        secondary: { main: "#8bc34a" },
      },
    }),
  },

  purple: {
    light: createTheme({
      ...basePalette,
      palette: {
        mode: "light",
        primary: { main: "#ba68c8" },
        secondary: { main: "#f3e5f5" },
      },
    }),
    dark: createTheme({
      ...basePalette,
      palette: {
        mode: "dark",
        primary: { main: "#9c27b0" },
        secondary: { main: "#ce93d8" },
      },
    }),
  },
};
