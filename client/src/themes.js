// themes.js
import { createTheme } from "@mui/material/styles";
import LinkBehavior from "./components/LinkBehavior";

const basePalette = {
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
  },
};

// Create a shared components config
const linkAwareComponents = {
  MuiLink: {
    defaultProps: {
      component: LinkBehavior,
    },
  },
  MuiButtonBase: {
    defaultProps: {
      LinkComponent: LinkBehavior,
    },
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
      components: linkAwareComponents,
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
      components: linkAwareComponents,
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
      components: linkAwareComponents,
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
      components: linkAwareComponents,
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
      components: linkAwareComponents,
    }),
    dark: createTheme({
      ...basePalette,
      palette: {
        mode: "dark",
        primary: { main: "#4caf50" },
        secondary: { main: "#8bc34a" },
      },
      components: linkAwareComponents,
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
      components: linkAwareComponents,
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
