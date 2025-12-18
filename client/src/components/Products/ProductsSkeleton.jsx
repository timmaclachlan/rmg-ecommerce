import { Box, Skeleton } from '@mui/material';

export default function ProductsSkeleton({ columns = 3 }) {
  const count = columns * 3; // 3 rows of product cards

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          variant="rectangular"
          height={250}
          sx={{ borderRadius: 2 }}
        />
      ))}
    </Box>
  );
}
