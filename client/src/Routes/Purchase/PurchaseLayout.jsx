import { Outlet } from 'react-router';
import StoreTop from '../../components/Header/StoreTop';

function Footer() {
  return (
    <footer>
      <div>This is the footer</div>
    </footer>
  );
}

function PurchaseLayout() {
  return (
    <>
      <StoreTop />
      <Outlet />
      <Footer />
    </>
  );
}

export default PurchaseLayout;
