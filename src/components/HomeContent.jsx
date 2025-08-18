import { useLoaderData, useNavigate } from 'react-router';

import { Grid, Typography } from '@mui/material';

import BasketMini from './Basket/BasketMini';
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
      <BasketMini />
      <Grid container spacing={2}>
        <Grid item xs="auto">
          <Categories
            categories={categories}
            onCategoriesClick={handleCategoryClick}
          />
        </Grid>
        <Grid item xs>
          <Products products={products} />
        </Grid>
      </Grid>
    </>
  );
}

export default HomeContent;
