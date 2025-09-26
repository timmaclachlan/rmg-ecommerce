import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  console.log('Mocking enabled');
  const { worker } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    quiet: false, // logs all intercepted requests
    onUnhandledRequest: 'warn', // great for debugging
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
