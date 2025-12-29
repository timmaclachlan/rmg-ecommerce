import { Box, Typography, Stack, Divider, Button, Avatar } from '@mui/material';
import { useBasket } from '../../hooks/useBasket';
import { Link } from 'react-router-dom';
import ProductPrice from '../Products/ProductPrice';

export default function BasketPopup() {
  const { basketItems, getTotalForBasket } = useBasket();

  if (basketItems.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Your basket is empty.
        </Typography>
        <Link to="/store" style={{ textDecoration: 'none' }}>
          <Button size="small" sx={{ mt: 1 }} variant="contained">
            Shop Now
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box>
      <Stack spacing={1.5}>
        {basketItems.map((item) => {
          const hasDiscount = item.discountPercentage > 0;
          const discountedPrice = hasDiscount
            ? item.price * (1 - item.discountPercentage / 100)
            : item.price;
          const lineTotal = discountedPrice * item.quantity;

          return (
            <Stack
              key={item.id}
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{
                py: 0.5,
                borderRadius: 1,
                transition: 'background-color 0.2s ease',
                '&:hover': { backgroundColor: 'action.hover' },
              }}
            >
              <Avatar
                variant="rounded"
                src={item.thumbnail}
                alt={item.title}
                sx={{ width: 40, height: 40, borderRadius: 1 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="body2"
                  noWrap
                  sx={{ fontWeight: 500, lineHeight: 1.2 }}
                >
                  {item.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Qty: {item.quantity}
                </Typography>

                {/* Price section */}
                <ProductPrice
                  discountPercentage={item.discountPercentage}
                  price={item.price}
                  variant="caption"
                />
              </Box>

              {/* Line total on the right */}
              <Typography variant="body2" fontWeight={600}>
                £{lineTotal.toFixed(2)}
              </Typography>
            </Stack>
          );
        })}
      </Stack>

      <Divider sx={{ my: 1.5 }} />

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1 }}
      >
        <Typography variant="subtitle2" fontWeight={700}>
          Total
        </Typography>
        <Typography variant="subtitle1" color="primary" fontWeight={700}>
          £{getTotalForBasket.toFixed(2)}
        </Typography>
      </Stack>

      <Link to="/purchase/basket" style={{ textDecoration: 'none' }}>
        <Button fullWidth variant="contained" size="small">
          View Basket
        </Button>
      </Link>
    </Box>
  );
}
