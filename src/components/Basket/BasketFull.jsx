import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useBasket } from "../../hooks/useBasket";

function BasketFull({ onStageChange }) {
  const { basketItems, deleteItem } = useBasket();
  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
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
        <Button variant="outlined" onClick={() => onStageChange("Products")}>
          Go to Products
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onStageChange("Checkout")}
        >
          Checkout
        </Button>
      </Stack>
    </Paper>
  );
}

export default BasketFull;
