import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Grid, Typography } from '@mui/material';

import Products from './Products/Products';
import Categories from './Categories/Categories';

import { productsPageLoader } from '../loaders/productLoaders';

function HomeContent() {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState({
    categories: [],
    products: [],
  });

  useEffect(() => {
    const loadData = async () => {
      const { categories, products } = await productsPageLoader(params);
      setData({ categories, products });
    };

    loadData();
  }, [params]);

  const handleCategoryClick = (category) => {
    navigate(`/store/${category}`);
  };

  const categoryName =
    data.categories.find((t) => t.slug === params.category)?.name ||
    'All Products';

  return (
    <>
      <Grid container spacing={2}>
        <Grid>
          <Categories
            categories={data.categories}
            onCategoriesClick={handleCategoryClick}
          />
        </Grid>
        <Grid>
          <Typography variant="h4" gutterBottom>
            {categoryName}
          </Typography>
          <Products products={data.products} />
        </Grid>
      </Grid>
    </>
  );
}

HomeContent.displayName = 'RMG-HomeContent';

export default HomeContent;
