import { useLoaderData, useNavigate } from 'react-router';

import { Grid } from '@mui/material';

import Products from './Products/Products';
import Categories from './Categories/Categories';

function HomeContent() {
  const navigate = useNavigate();
  const { categories, products } = useLoaderData();

  const handleCategoryClick = (category) => {
    navigate(`/store/${category}`);
  };

  return (
    <>
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
