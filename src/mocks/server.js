// /mocks/server.js
import { setupServer } from 'msw/node';
import { basketHandlers } from './handlers/basketHandlers';
import { productHandlers } from './handlers/productHandlers';
import { categoryHandlers } from './handlers/categoryHandlers';
import { customerHandlers } from './handlers/customerHandlers';

export const server = setupServer(
  ...basketHandlers,
  ...productHandlers,
  ...categoryHandlers,
  ...customerHandlers,
);
