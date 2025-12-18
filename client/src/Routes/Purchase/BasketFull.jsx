import {
  Typography,
  Paper,
  List,
  ListItem,
  Grid,
  IconButton,
  Divider,
  Stack,
  Button,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { useBasket } from '../../hooks/useBasket';
import { Link } from 'react-router';

import ProductPrice from '../../components/Products/ProductPrice';

function BasketFull() {
  const {
    basketItems,
    deleteItem,
    clearBasket,
    updateQuantity,
    getCount,
    getTotalForBasket,
    getTotalForItem,
  } = useBasket();
  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Your Basket
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {getCount === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
          Your basket is currently empty. <br />
          <Link to="/store" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ mt: 2 }}>
              Go Back Shopping
            </Button>
          </Link>
        </Typography>
      ) : (
        <>
          <List>
            {basketItems.map((item) => (
              <ListItem key={item.id} sx={{ py: 2 }}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ width: '100%', display: 'flex' }}
                >
                  {/* Thumbnail */}
                  <Grid item md={2}>
                    <Box
                      component="img"
                      src={item.thumbnail}
                      alt={item.title}
                      sx={{
                        width: 64,
                        height: 64,
                        objectFit: 'cover',
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                    />
                  </Grid>

                  {/* Title, Price, Discount, Line Total */}
                  <Grid item md={4}>
                    <Stack spacing={0.5}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {item.title}
                      </Typography>

                      <ProductPrice
                        discountPercentage={item.discountPercentage}
                        price={item.price}
                      />
                    </Stack>
                  </Grid>

                  {/* Line Total + Quantity Controls + Delete */}
                  <Grid item md={6}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      {/* Line Total */}
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        color="text.secondary"
                      >
                        Line total: £{getTotalForItem(item).toFixed(2)}
                      </Typography>

                      {/* Quantity Controls + Delete */}
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton onClick={() => deleteItem(item)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            spacing={2}
          >
            <Typography variant="h6">
              Total: £{getTotalForBasket.toFixed(2)}
            </Typography>
            <Button variant="outlined" onClick={clearBasket}>
              Clear Basket
            </Button>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            flexWrap="wrap"
          >
            <Link to="/store" style={{ textDecoration: 'none' }}>
              <Button variant="text">Go Back Shopping</Button>
            </Link>
            <Link to="/purchase/checkout" style={{ textDecoration: 'none' }}>
              <Button variant="contained">Proceed to Checkout</Button>
            </Link>
          </Stack>
        </>
      )}
    </Paper>
  );
}

export default BasketFull;
