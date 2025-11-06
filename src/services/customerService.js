// customerService.js
import { db } from '../mocks/db';

export function getCustomerById(id) {
  return db.customers.find((c) => c.id === Number(id)) || null;
}

export function updateCustomer(updated) {
  const index = db.customers.findIndex((c) => c.id === updated.id);
  if (index === -1) return null;

  db.customers[index] = { ...db.customers[index], ...updated };
  return db.customers[index];
}
