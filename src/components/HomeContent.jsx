import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Typography, Box, Paper } from '@mui/material';

import Products from './Products/Products';
import Categories from './Categories/Categories';

import { productsPageLoader } from '../loaders/productLoaders';

function HomeContent() {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState({ categories: [], products: [] });

  // For dynamic layout demo
  const containerRef = useRef(null);
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const loadData = async () => {
      const { categories, products } = await productsPageLoader(params);
      setData({ categories, products });
    };
    loadData();
  }, [params]);

  // Dynamically calculate grid columns based on container width
  useLayoutEffect(() => {
    const updateColumns = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const newColumns = Math.floor(width / 260); // approx width per card
        setColumns(Math.max(newColumns, 1)); // at least 1 column
      }
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/store/${category}`);
  };

  const categoryName =
    data.categories.find((t) => t.slug === params.category)?.name ||
    'All Products';

  return (
    <Box sx={{ display: 'flex', p: 2, gap: 2 }}>
      {/* LEFT COLUMN - Categories */}
      <Paper
        elevation={2}
        sx={{
          width: 300,
          flexShrink: 0,
          p: 2,
          height: 'fit-content',
        }}
      >
        <Categories
          categories={data.categories}
          onCategoriesClick={handleCategoryClick}
        />
      </Paper>

      {/* RIGHT COLUMN - Products */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" gutterBottom>
          {categoryName}
        </Typography>
        <Box ref={containerRef} sx={{ flex: 1 }}>
          <Products products={data.products} columns={columns} />
        </Box>
      </Box>
    </Box>
  );
}

HomeContent.displayName = 'RMG-HomeContent';

export default HomeContent;
