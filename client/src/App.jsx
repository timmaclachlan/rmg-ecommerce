import { RouterProvider } from 'react-router-dom';

import AppProviders from './components/AppProviders';

import './index.css';

import router from './Routes/Router';

const App = () => {
  return (
    <>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </>
  );
};

export default App;
