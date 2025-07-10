import { Typography, Box, Stack } from "@mui/material";

import ThemeModeSwitch from "./ThemeModeSwitch";
import ThemeSelector from "./ThemeSelector";

function Header() {
  return (
    <Box
      component="header"
      sx={(theme) => ({
        width: "100%",
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      })}
    >
      <Typography variant="h6">Our Store</Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <ThemeSelector />
        <ThemeModeSwitch />
      </Stack>
    </Box>
  );
}

export default Header;
