import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Stack,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { useBasket } from '../../hooks/useBasket';
import { Link } from 'react-router';

function BasketFull() {
  const { basketItems, deleteItem, clearBasket, updateQuantity } = useBasket();
  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Your Basket
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        {basketItems.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <IconButton edge="end">
                <DeleteIcon onClick={() => deleteItem(item)} />
              </IconButton>
            }
          >
            <ListItemText primary={`${item.quantity} of ${item.title}`} />
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <RemoveIcon />
              </IconButton>
              <Typography>{item.quantity}</Typography>
              <IconButton
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <AddIcon />
              </IconButton>
            </Stack>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Button variant="outlined" onClick={() => clearBasket()}>
        Clear Basket
      </Button>

      <Stack direction="row" spacing={2} flexWrap="wrap">
        <Link to="/store" style={{ textDecoration: 'none' }}>
          Go to Products
        </Link>
        <Link to="/purchase/checkout" style={{ textDecoration: 'none' }}>
          Proceed to Checkout
        </Link>
      </Stack>
    </Paper>
  );
}

export default BasketFull;
