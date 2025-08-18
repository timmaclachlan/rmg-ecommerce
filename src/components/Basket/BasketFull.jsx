import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useBasket } from '../../hooks/useBasket';

function BasketFull() {
  const { basketItems, deleteItem } = useBasket();
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
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />

      <Stack direction="row" spacing={2} flexWrap="wrap">
        <a href="/store" style={{ textDecoration: 'none' }}>
          Go to Products
        </a>
        <a href="/purchase/checkout" style={{ textDecoration: 'none' }}>
          Go to Checkout
        </a>
      </Stack>
    </Paper>
  );
}

export default BasketFull;
