import { useState } from 'react';
import { useNavigate } from 'react-router';

import {
  Box,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  CardActionArea,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';

import { useBasket } from '../../hooks/useBasket';

function Products({ products }) {
  const navigate = useNavigate();
  const { addItem } = useBasket();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenDialog = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Shop Products
      </Typography>

      <Stack spacing={3}>
        {products.map((item) => (
          <Card
            key={item.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'scale(1.01)',
                boxShadow: 4,
              },
            }}
          >
            <CardActionArea
              onClick={() => handleOpenDialog(item)}
              sx={{ display: 'flex', alignItems: 'stretch' }}
            >
              <CardMedia
                component="img"
                image={item.thumbnail}
                alt={item.title}
                sx={{
                  width: 120,
                  height: 120,
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    onClick={() =>
                      navigate(`/store/products/${item.id}/${item.category}`)
                    }
                  >
                    {item.title}
                  </Typography>
                  {item.isNew && (
                    <Chip label="New" color="success" size="small" />
                  )}
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {item.description || 'No description available.'}
                </Typography>
                <Typography variant="body1" color="primary">
                  £{item.price.toFixed(2)}
                </Typography>
              </CardContent>
            </CardActionArea>

            <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
              <Box>
                <Tooltip title="Add to wishlist">
                  <IconButton>
                    <FavoriteBorderIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share">
                  <IconButton>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Button variant="contained" onClick={() => addItem(item)}>
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>

      <Box textAlign="center" mt={5}>
        <a href="/basket">Go to Basket</a>
        <Button href="/basket">Go to Basket</Button>
      </Box>

      {/* Dialog component */}
      <Dialog
        open={Boolean(selectedItem)}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        {selectedItem && (
          <>
            <DialogTitle>{selectedItem.title}</DialogTitle>
            <DialogContent dividers>
              <Typography variant="body1" gutterBottom>
                {selectedItem.description || 'No description available.'}
              </Typography>
              <Typography variant="h6" color="primary">
                £{selectedItem.price.toFixed(2)}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default Products;
