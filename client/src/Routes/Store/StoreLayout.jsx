import { useState } from 'react';
import { Outlet } from 'react-router-dom';

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
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <StoreTop />
      <Header
        onSearch={(value) => {
          setSearchTerm(value);
        }}
      />
      <Outlet context={{ searchTerm }} />
      <Footer />
    </>
  );
}

export default StoreLayout;
