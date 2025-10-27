// /mocks/browser.js
import { setupWorker } from 'msw';
import { basketHandlers } from './handlers/basketHandlers';
import { productHandlers } from './handlers/productHandlers';
import { categoryHandlers } from './handlers/categoryHandlers';

export const worker = setupWorker(
  ...basketHandlers,
  ...productHandlers,
  ...categoryHandlers
);
