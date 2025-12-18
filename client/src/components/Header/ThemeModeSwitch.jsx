import { Switch, Stack } from "@mui/material";
import { Global, css } from "@emotion/react";

import { Brightness7, Brightness4 } from "@mui/icons-material";

import { useThemeContext } from "../../context/ThemeContext";

export default function ThemeModeSwitch() {
  const { themeMode, toggleThemeMode } = useThemeContext();
  const isDark = themeMode === "dark";

  return (
    <>
      <Global
        styles={css`
          @keyframes thumbPop {
            0% {
              transform: scale(1) rotate(0deg);
            }
            50% {
              transform: scale(1.3) rotate(15deg);
            }
            100% {
              transform: scale(1) rotate(0deg);
            }
          }
        `}
      />
      <Stack direction="row" alignItems="center" spacing={1}>
        <Brightness7 sx={{ opacity: isDark ? 0.4 : 1 }} />
        <Switch
          checked={isDark}
          onChange={toggleThemeMode}
          color="default"
          sx={{
            width: 62,
            height: 34,
            padding: 0,
            "& .MuiSwitch-switchBase": {
              padding: "4px",
              transitionDuration: "300ms",
              transform: isDark ? "translateX(28px)" : "translateX(4px)",
            },
            "& .MuiSwitch-thumb": {
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
              animation: isDark ? "thumbPop 400ms ease" : "none",
            },
            "& .MuiSwitch-track": {
              borderRadius: 20,
              background: isDark
                ? "linear-gradient(90deg, #434343 0%, #000000 100%)"
                : "linear-gradient(90deg, #e0e0e0 0%, #f5f5f5 100%)",
              opacity: 1,
              transition: "background 0.4s ease",
            },
          }}
        />
        <Brightness4 sx={{ opacity: isDark ? 1 : 0.4 }} />
      </Stack>
    </>
  );
}
