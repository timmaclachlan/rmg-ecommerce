import { BrowserRouter, Routes, Route } from 'react-router';

import AppProviders from './components/AppProviders';
import HomeContent from './components/HomeContent';
import Checkout from './components/Checkout';
import BasketFull from './components/Basket/BasketFull';
import StoreLayout from './components/StoreLayout';
import PurchaseLayout from './components/PurchaseLayout';
import ProductDetailContainer from './components/Products/ProductDetailContainer';

import './index.css';

const NotFound = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
  </div>
);

const App = () => {
  return (
    <>
      <AppProviders>
        <BrowserRouter>
          <Routes>
            <Route element={<StoreLayout />}>
              <Route index element={<HomeContent />} />
              <Route
                path="/products/:id/:category?"
                element={<ProductDetailContainer />}
              />
            </Route>

            <Route element={<PurchaseLayout />}>
              <Route path="/basket" element={<BasketFull />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProviders>
    </>
  );
};

export default App;
