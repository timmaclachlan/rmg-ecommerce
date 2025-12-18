import { Typography, Paper, Skeleton, List, Divider } from '@mui/material';

export default function CategoriesSkeleton() {
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
        {[...Array(16)].map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width="100%"
            height={30}
            sx={{ mb: 1, borderRadius: 1 }}
          />
        ))}
      </List>
    </Paper>
  );
}
