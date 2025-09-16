import { Typography, Box } from '@mui/material';
import BasketMini from '../Basket/BasketMini';
import User from '../User/User';

function StoreTop() {
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

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <BasketMini />
        <User />
      </Box>
    </Box>
  );
}

export default StoreTop;
