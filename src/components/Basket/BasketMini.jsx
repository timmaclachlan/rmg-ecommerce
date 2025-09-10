import { IconButton, Badge } from '@mui/material';
import { Link } from 'react-router';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useBasket } from '../../hooks/useBasket';

function BasketMini() {
  const { getCount } = useBasket();

  return (
    <IconButton
      aria-label="shopping basket"
      sx={{ pr: 4, pt: 2 }}
      component={Link}
      to="/purchase/basket"
    >
      <Badge badgeContent={getCount} color="error">
        <ShoppingCartIcon sx={{ color: '#ffffff' }} />
      </Badge>
    </IconButton>
  );
}

export default BasketMini;
