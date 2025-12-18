import { Stack, Typography } from '@mui/material';

function ProductPrice({ discountPercentage, price, variant = 'h5' }) {
  if (discountPercentage > 0) {
    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography
          variant={variant}
          sx={{
            textDecoration: 'line-through',
            color: 'text.secondary',
          }}
        >
          £{price.toFixed(2)}
        </Typography>
        <Typography variant={variant} color="success.main" fontWeight={600}>
          £{(price * (1 - discountPercentage / 100)).toFixed(2)}
        </Typography>
      </Stack>
    );
  }
  return (
    <Typography variant="body1" color="primary">
      £{price.toFixed(2)}
    </Typography>
  );
}

export default ProductPrice;
