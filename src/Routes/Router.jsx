// src/routes/router.jsx
import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
} from "react-router";

import PageNotFound from "./PageNotFound";

import StoreLayout from "./Store/StoreLayout";
import PurchaseLayout from "./Purchase/PurchaseLayout";
import CategoryPage from "./Store/index";
import ProductPage from "./Store/Products/index";

import BasketFull from "./Purchase/BasketFull";
import Checkout from "./Purchase/Checkout";
import OrderConfirmation from "./Purchase/OrderConfirmation";
import ProductErrorBoundary from "./Store/Products/ProductErrorBoundary";
import CategoryErrorBoundary from "./Store/CategoryErrorBoundary";

import { productsPageLoader, productLoader } from "../loaders/loaders";
import { checkoutAction } from "../actions/actions";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="store" element={<StoreLayout />}>
        <Route index element={<CategoryPage />} loader={productsPageLoader} />
        <Route
          path=":category"
          element={<CategoryPage />}
          loader={productsPageLoader}
          errorElement={<CategoryErrorBoundary />}
        />
        <Route
          path="products/:id?/:category?"
          element={<ProductPage />}
          loader={productLoader}
          errorElement={<ProductErrorBoundary />}
        />
      </Route>

      <Route path="purchase" element={<PurchaseLayout />}>
        <Route path="basket" element={<BasketFull />} />
        <Route path="checkout" element={<Checkout />} action={checkoutAction} />
        <Route path="confirmation" element={<OrderConfirmation />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
