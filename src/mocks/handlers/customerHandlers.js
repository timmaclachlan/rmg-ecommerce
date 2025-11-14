import { rest } from 'msw';

import {
  getCustomerById,
  updateCustomer,
} from '../../services/customerService';

export const customerHandlers = [
  // GET customer
  rest.get('/api/customer/:customerId', (req, res, ctx) => {
    console.log('MSW intercepted GET /api/customer');
    const { customerId } = req.params;
    const customer = getCustomerById(customerId);
    if (!customer)
      return res(ctx.status(404), ctx.json({ error: 'Customer not found' }));
    return res(ctx.status(200), ctx.json(customer));
  }),

  // PUT customer
  rest.put('/api/customer', async (req, res, ctx) => {
    console.log('MSW intercepted PUT /api/customer');
    const updatedCustomer = await req.json();
    const result = updateCustomer(updatedCustomer);

    if (!result) {
      return res(ctx.status(404), ctx.json({ error: 'Customer not found' }));
    }

    return res(ctx.status(200), ctx.json(result));
  }),
];
