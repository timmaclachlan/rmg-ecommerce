import { Outlet } from 'react-router';

import StoreTop from '../../components/Header/StoreTop';
import Header from '../../components/Header/Header';

function Footer() {
  return (
    <footer>
      <div>This is the footer</div>
    </footer>
  );
}

function StoreLayout() {
  return (
    <>
      <StoreTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default StoreLayout;
