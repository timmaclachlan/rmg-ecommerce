import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Grid } from '@mui/material';

import Products from './Products/Products';
import Categories from './Categories/Categories';

import { productsPageLoader } from '../loaders/loaders';

function HomeContent() {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState({ categories: [], products: [] });

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
          <Products products={data.products} />
        </Grid>
      </Grid>
    </>
  );
}

HomeContent.displayName = 'RMG-HomeContent';

export default HomeContent;
