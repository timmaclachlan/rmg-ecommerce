import { useState } from "react";

import { Grid, Typography } from "@mui/material";

import BasketMini from "./Basket/BasketMini";
import ProductsContainer from "./Products/ProductsContainer";
import CategoriesContainer from "./Categories/CategoriesContainer";
import BasketFull from "./Basket/BasketFull";
import Checkout from "./Checkout";

import { useCustomer } from "../hooks/useCustomer";

function HomeContent() {
  const [stage, setStage] = useState("Products");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { customer } = useCustomer();

  function onCompleteCheckout(name, email) {
    alert(name);
    alert(email);
  }

  return (
    <>
      <Typography variant="caption">Logged in as: {customer.name}</Typography>
      {stage === "Basket" && <BasketFull onStageChange={(s) => setStage(s)} />}
      {stage !== "Basket" && <BasketMini />}
      <Grid container spacing={2}>
        <Grid item xs="auto">
          {stage === "Checkout" && (
            <Checkout
              onCompleteCheckout={onCompleteCheckout}
              onStageChange={(s) => setStage(s)}
            />
          )}

          {stage === "Products" && (
            <CategoriesContainer
              onCategoriesClick={(cat) => setSelectedCategory(cat)}
            />
          )}
        </Grid>
        <Grid item xs>
          {stage === "Products" && (
            <ProductsContainer
              category={selectedCategory}
              onStageChange={(s) => setStage(s)}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default HomeContent;
