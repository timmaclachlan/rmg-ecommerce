// src/routes/router.jsx
import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
} from 'react-router';

import NotFound from './NotFound';

import StoreLayout from './Store/StoreLayout';
import PurchaseLayout from './Purchase/PurchaseLayout';
import CategoryPage from './Store/index';
import ProductPage from './Store/Products/index';
import StoreNotFound from './Store/Products/StoreNotFound';

import BasketFull from './Purchase/BasketFull';
import Checkout from './Purchase/Checkout';
import OrderConfirmation from './Purchase/OrderConfirmation';

import { productsPageLoader, productLoader } from '../loaders/loaders';
import { checkoutAction } from '../actions/actions';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="store" element={<StoreLayout />}>
        <Route index element={<CategoryPage />} loader={productsPageLoader} />
        <Route
          path=":category"
          element={<CategoryPage />}
          loader={productsPageLoader}
        />
        <Route
          path="products/:id?/:category?"
          element={<ProductPage />}
          loader={productLoader}
        />
        <Route path="products/notfound" element={<StoreNotFound />} />
      </Route>

      <Route path="purchase" element={<PurchaseLayout />}>
        <Route path="basket" element={<BasketFull />} />
        <Route path="checkout" element={<Checkout />} action={checkoutAction} />
        <Route path="confirmation" element={<OrderConfirmation />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </>,
  ),
);

export default router;
