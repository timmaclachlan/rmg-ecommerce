import { useLoaderData } from 'react-router';
import { Outlet } from 'react-router';

import StoreTop from './Header/StoreTop';
import Header from './Header/Header';

function Footer() {
  return (
    <footer>
      <div>This is the footer</div>
    </footer>
  );
}

function StoreLayout() {
  const { categories, products } = useLoaderData();

  return (
    <>
      <StoreTop />
      <Header />
      <Outlet context={{ categories, products }} />
      <Footer />
    </>
  );
}

export default StoreLayout;
