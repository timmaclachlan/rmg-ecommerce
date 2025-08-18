import { createBrowserRouter, redirect } from 'react-router';

import HomeContent from '../components/HomeContent';
import Checkout from '../components/Checkout';
import BasketFull from '../components/Basket/BasketFull';
import StoreLayout from '../components/StoreLayout';
import PurchaseLayout from '../components/PurchaseLayout';
import ProductDetail from '../components/Products/ProductDetail';
import StoreNotFound from './StoreNotFound';
import NotFound from './NotFound';
import OrderConfirmation from '../components/OrderConfirmation';

import { productLoader, productsPageLoader } from '../loaders/loaders';

const AppRoutes = createBrowserRouter([
  {
    path: 'store',
    Component: StoreLayout,
    children: [
      {
        path: ':category?',
        Component: HomeContent,
        loader: productsPageLoader,
      },
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
      {
        path: 'checkout',
        Component: Checkout,
        action: async ({ request }) => {
          const formData = await request.formData();
          const customer = Object.fromEntries(formData);
          alert(`Thank you for your purchase, ${customer.name}!`);
          // Save customer, trigger confirmation, etc.
          return redirect('/purchase/confirmation');
        },
      },
      {
        path: 'confirmation',
        Component: OrderConfirmation,
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);

export default AppRoutes;
