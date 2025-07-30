import { Routes, Route } from 'react-router';

import HomeContent from './components/HomeContent';
import Checkout from './components/Checkout';
import BasketFull from './components/Basket/BasketFull';
import StoreLayout from './components/StoreLayout';
import PurchaseLayout from './components/PurchaseLayout';
import ProductDetailContainer from './components/Products/ProductDetailContainer';

const NotFound = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
  </div>
);

const StoreNotFound = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>404 - Product or Category Not Found</h1>
    <p>The category or product does not exist</p>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="catalog">
        <Route element={<StoreLayout />}>
          <Route index element={<HomeContent />} />
          <Route
            path="products/:id/:category?"
            element={<ProductDetailContainer />}
          />
          <Route path="products/notfound" element={<StoreNotFound />} />
        </Route>
      </Route>

      <Route element={<PurchaseLayout />}>
        <Route path="/basket" element={<BasketFull />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
