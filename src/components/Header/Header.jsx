import { useRef, useEffect } from 'react';
import {
  Typography,
  Box,
  Stack,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router';

import ThemeModeSwitch from './ThemeModeSwitch';
import ThemeSelector from './ThemeSelector';

function Header({ onSearch }) {
  const inputRef = useRef(null);

  // auto-focus the search bar when header loads
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const value = inputRef.current?.value ?? '';
      if (onSearch) onSearch(value);
    }
  };

  return (
    <Box
      component="header"
      sx={(theme) => ({
        width: '100%',
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      })}
    >
      <Link to="/store" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography variant="h6">Our Store</Typography>
      </Link>

      <FormControl
        variant="outlined"
        sx={{ minWidth: 420, bgcolor: 'white', borderRadius: 1 }}
      >
        <OutlinedInput
          inputRef={inputRef}
          placeholder="Search products..."
          onKeyDown={handleKeyDown}
          aria-label="search-products"
          // startAdornment: magnifier icon inside the text box at the start
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          sx={{
            // keep the internal input padding intact; adjust as needed
            bgcolor: 'white',
            borderRadius: 1,
          }}
        />
      </FormControl>

      <Stack direction="row" spacing={2} alignItems="center">
        <ThemeSelector />
        <ThemeModeSwitch />
      </Stack>
    </Box>
  );
}

Header.displayName = 'RMG-Header';

export default Header;
