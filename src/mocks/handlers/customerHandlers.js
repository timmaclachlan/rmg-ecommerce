import { rest } from 'msw';
import { db } from '../db';

export const customerHandlers = [
  // GET customer
  rest.get('http://localhost/api/customer/:customerId', (req, res, ctx) => {
    console.log('MSW intercepted GET /api/customer');
    const { customerId } = req.params;
    const customer = db.customers.find((p) => p.id === Number(customerId));
    if (!customer)
      return res(ctx.status(404), ctx.json({ error: 'Customer not found' }));
    return res(ctx.status(200), ctx.json(customer));
  }),

  // PUT customer
  rest.put('http://localhost/api/customer', async (req, res, ctx) => {
    console.log('MSW intercepted PUT /api/customer');
    const updatedCustomer = await req.json();
    db.customer = { ...db.customer, ...updatedCustomer };
    return res(ctx.status(200), ctx.json(db.customer));
  }),
];
