import { createBrowserRouter } from 'react-router';

import HomeContent from '../components/HomeContent';
import Checkout from '../components/Checkout';
import BasketFull from '../components/Basket/BasketFull';
import StoreLayout from '../components/StoreLayout';
import PurchaseLayout from '../components/PurchaseLayout';
import ProductDetail from '../components/Products/ProductDetail';
import StoreNotFound from './StoreNotFound';
import NotFound from './NotFound';

import { productLoader, productsPageLoader } from '../loaders/loaders';

const AppRoutes = createBrowserRouter([
  {
    path: 'store',
    Component: StoreLayout,
    loader: productsPageLoader,
    children: [
      { index: true, Component: HomeContent },
      {
        path: 'products/:id?/:category?',
        Component: ProductDetail,
        loader: productLoader,
      },
      {
        path: 'products/notfound',
        Component: StoreNotFound,
      },
    ],
  },
  {
    path: 'purchase', // if this is not present then it will catch other routes
    Component: PurchaseLayout,
    children: [
      { path: 'basket', Component: BasketFull },
      { path: 'checkout', Component: Checkout },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);

export default AppRoutes;
