import { useState } from 'react';

import {
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';

function Categories({ categories, onCategoriesClick: onClick }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelect = (category) => {
    setSelectedCategory(category);
    onClick(category);
  };

  return (
    <Paper
      elevation={3}
      sx={(theme) => ({
        p: 2,
        maxWidth: 300,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        border: '1px solid',
        borderColor: theme.palette.divider,
        boxShadow: theme.shadows[3],
      })}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={(theme) => ({
          color: theme.palette.secondary.main,
        })}
      >
        Categories
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <List dense>
        {categories.map((category, index) => (
          <ListItemButton
            key={index}
            selected={selectedCategory === category}
            onClick={() => handleSelect(category)}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              '&.Mui-selected': {
                bgcolor: 'primary.dark',
                color: 'primary.contrastText',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              },
            }}
          >
            <ListItemText primary={category} />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
}

export default Categories;
