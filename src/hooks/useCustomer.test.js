/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react';
import { useCustomer } from './useCustomer';

import { server } from '../mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('useCustomer', () => {
  it('logs in and sets customer state', async () => {
    const { result } = renderHook(() => useCustomer());

    await act(async () => {
      await result.current.login(1);
    });

    expect(result.current.customer).toMatchObject({
      id: 1,
      name: 'John Doe',
      user: { isAuthenticated: true },
    });
  });

  it('updates customer details', async () => {
    const { result } = renderHook(() => useCustomer());

    await act(async () => {
      await result.current.login(1);
      result.current.updateCustomer({ id: 1, name: 'Johnny' });
    });

    expect(result.current.customer.name).toBe('Johnny');
  });

  it('logs out and clears customer', async () => {
    const { result } = renderHook(() => useCustomer());

    await act(async () => {
      await result.current.login(1);
      result.current.logout();
    });

    expect(result.current.customer).toBeNull();
  });
});
