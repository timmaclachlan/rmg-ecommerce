import { Select, MenuItem } from "@mui/material";

import { useThemeContext } from "../../context/ThemeContext";

const themeOptions = ["blue", "materialui", "green", "purple"];

export default function ThemeSelector() {
  const { themeFamily, setThemeFamily } = useThemeContext();

  return (
    <Select
      value={themeFamily}
      onChange={(e) => setThemeFamily(e.target.value)}
      size="small"
      sx={{ color: "primary.contrastText" }}
    >
      {themeOptions.map((family) => (
        <MenuItem key={family} value={family}>
          {family.charAt(0).toUpperCase() + family.slice(1)}
        </MenuItem>
      ))}
    </Select>
  );
}
