// customerService.test.js
import { db } from '../mocks/db';
import { getCustomerById, updateCustomer } from './customerService';

describe('customerService', () => {
  it('gets customer by ID', () => {
    const customer = getCustomerById(1);
    expect(customer).toMatchObject({ id: 1, name: 'John Doe' });
  });

  it('returns null for unknown ID', () => {
    const customer = getCustomerById(999);
    expect(customer).toBeNull();
  });

  it('updates customer correctly', () => {
    const updated = updateCustomer({ id: 1, name: 'Johnny' });
    expect(updated.name).toBe('Johnny');
    expect(db.customers[0].name).toBe('Johnny');
  });

  it('returns null for update on unknown ID', () => {
    const result = updateCustomer({ id: 999, name: 'Ghost' });
    expect(result).toBeNull();
  });
});
