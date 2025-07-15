import { useState } from "react";

import { Grid, Typography } from "@mui/material";

import BasketMini from "./Basket/BasketMini";
import ProductsContainer from "./Products/ProductsContainer";
import CategoriesContainer from "./Categories/CategoriesContainer";

import { useCustomer } from "../hooks/useCustomer";

function HomeContent() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { customer } = useCustomer();

  return (
    <>
      <Typography variant="caption">Logged in as: {customer.name}</Typography>
      <BasketMini />
      <Grid container spacing={2}>
        <Grid item xs="auto">
          <CategoriesContainer
            onCategoriesClick={(cat) => setSelectedCategory(cat)}
          />
        </Grid>
        <Grid item xs>
          <ProductsContainer category={selectedCategory} />
        </Grid>
      </Grid>
    </>
  );
}

export default HomeContent;
