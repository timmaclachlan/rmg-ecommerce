import { BrowserRouter, Routes, Route } from "react-router";

import AppProviders from "./components/AppProviders";
import HomeContent from "./components/HomeContent";
import Checkout from "./components/Checkout";
import BasketFull from "./components/Basket/BasketFull";

import "./index.css";

const App = () => {
  return (
    <>
      <AppProviders>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/basket" element={<BasketFull />} />
          </Routes>
        </BrowserRouter>
      </AppProviders>
    </>
  );
};

export default App;
