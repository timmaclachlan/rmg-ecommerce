import { useLoaderData, useNavigate } from 'react-router';

import { Grid } from '@mui/material';

import Products from './Products/Products';
import Categories from './Categories/Categories';
import User from './User/User';
function HomeContent() {
  const navigate = useNavigate();
  const { categories, products } = useLoaderData();

  const handleCategoryClick = (category) => {
    navigate(`/store/${category}`);
  };

  return (
    <>
      <User />
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
