import { useLoaderData, useNavigate } from 'react-router';

import { Grid, Typography } from '@mui/material';

import Products from './Products/Products';
import Categories from './Categories/Categories';

import { useCustomer } from '../hooks/useCustomer';

function HomeContent() {
  const navigate = useNavigate();
  const { categories, products } = useLoaderData();

  const { customer } = useCustomer();

  const handleCategoryClick = (category) => {
    navigate(`/store/${category}`);
  };

  return (
    <>
      <Typography variant="caption">Logged in as: {customer.name}</Typography>
      <Grid container spacing={2}>
        <Grid>
          <Categories
            categories={categories}
            onCategoriesClick={handleCategoryClick}
          />
        </Grid>
        <Grid>
          <Products products={products} />
        </Grid>
      </Grid>
    </>
  );
}

HomeContent.displayName = 'RMG-HomeContent';

export default HomeContent;
