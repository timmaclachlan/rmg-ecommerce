import { Typography, Box, Stack } from '@mui/material';

function Header() {
  return (
    <Box
      component="header"
      sx={(theme) => ({
        width: '100%',
        p: 0.5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: theme.palette.primary.contrastText,
        color: theme.palette.primary.main,
      })}
    >
      <Typography variant="h6">Free Shipping!</Typography>
      <Typography variant="h6">Free Returns</Typography>
      <Stack direction="row" spacing={2} alignItems="center"></Stack>
    </Box>
  );
}

export default Header;
