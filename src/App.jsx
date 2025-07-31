import { RouterProvider } from 'react-router';

import AppProviders from './components/AppProviders';
import AppRoutes from './Routes/AppRoutes';

import './index.css';

const App = () => {
  return (
    <>
      <AppProviders>
        <RouterProvider router={AppRoutes} />
      </AppProviders>
    </>
  );
};

export default App;
