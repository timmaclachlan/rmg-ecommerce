import { BrowserRouter, Routes, Route } from 'react-router';

import AppProviders from './components/AppProviders';
import HomeContent from './components/HomeContent';
import Checkout from './components/Checkout';
import BasketFull from './components/Basket/BasketFull';
import StoreLayout from './components/StoreLayout';
import PurchaseLayout from './components/PurchaseLayout';

import './index.css';

const App = () => {
  return (
    <>
      <AppProviders>
        <BrowserRouter>
          <Routes>
            <Route element={<StoreLayout />}>
              <Route index element={<HomeContent />} />
            </Route>

            <Route element={<PurchaseLayout />}>
              <Route path="/basket" element={<BasketFull />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProviders>
    </>
  );
};

export default App;
