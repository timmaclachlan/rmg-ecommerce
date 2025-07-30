import { BrowserRouter } from 'react-router';

import AppProviders from './components/AppProviders';
import AppRoutes from './AppRoutes';

import './index.css';

const App = () => {
  return (
    <>
      <AppProviders>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProviders>
    </>
  );
};

export default App;
