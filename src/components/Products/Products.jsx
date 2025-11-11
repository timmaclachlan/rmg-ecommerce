import { useState } from 'react';
import { useNavigate } from 'react-router';

import {
  Box,
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

function Products({ products, columns }) {
  const navigate = useNavigate();
  const { addItem } = useBasket();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenDialog = (item) => setSelectedItem(item);
  const handleCloseDialog = () => setSelectedItem(null);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 2,
      }}
    >
      {products.map((item) => (
        <Card
          key={item.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              transform: 'scale(1.03)',
              boxShadow: 4,
            },
          }}
        >
          <CardActionArea
            onClick={() => handleOpenDialog(item)}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <CardMedia
              component="img"
              image={item.thumbnail}
              alt={item.title}
              sx={{ width: '100%', height: 140, objectFit: 'cover' }}
            />
            <CardContent>
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
                  sx={{ cursor: 'pointer' }}
                >
                  {item.title}
                </Typography>
                {item.isNew && (
                  <Chip label="New" color="success" size="small" />
                )}
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
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
              Add to Basket
            </Button>
          </CardActions>
        </Card>
      ))}

      {/* Dialog */}
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
