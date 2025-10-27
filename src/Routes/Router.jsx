// src/routes/router.jsx
import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
} from 'react-router';

import PageNotFound from './PageNotFound';

import StoreLayout from './Store/StoreLayout';
import PurchaseLayout from './Purchase/PurchaseLayout';
import CategoryPage from './Store/index';
import ProductPage from './Store/Products/index';

import BasketFull from './Purchase/BasketFull';
import Checkout from './Purchase/Checkout';
import OrderConfirmation from './Purchase/OrderConfirmation';
import ProductErrorBoundary from './Store/Products/ProductErrorBoundary';
import CategoryErrorBoundary from './Store/CategoryErrorBoundary';

import { checkoutAction } from '../actions/checkoutActions';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="store" element={<StoreLayout />}>
        <Route index element={<CategoryPage />} />
        <Route
          path=":category"
          element={<CategoryPage />}
          errorElement={<CategoryErrorBoundary />}
        />
        <Route
          path="products/:id?/:category?"
          element={<ProductPage />}
          errorElement={<ProductErrorBoundary />}
        />
      </Route>

      <Route path="purchase" element={<PurchaseLayout />}>
        <Route path="basket" element={<BasketFull />} />
        <Route path="checkout" element={<Checkout />} action={checkoutAction} />
        <Route path="confirmation" element={<OrderConfirmation />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </>,
  ),
);

export default router;
