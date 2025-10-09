import { server } from '../mocks/server';
import { productLoader } from './loaders';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('productLoader', () => {
  test('returns product data for valid ID', async () => {
    const result = await productLoader({ id: '1' } );
    expect(result).toMatchObject({ id: 1, title: 'Essence Mascara Lash Princess', price: 9.99 });
  });

  test('throws 404 error for missing product', async () => {
    await expect(productLoader({ id: '404' })).rejects.toMatchObject({
      data: { message: 'Product not found' },
      init: { status: 404 },
      type: 'DataWithResponseInit'});
  });

  test('throws 400 error for missing ID', async () => {
    await expect(productLoader({ id: '' })).rejects.toMatchObject({
      data: { message: 'No product ID provided' },
      init: { status: 400 },
      type: 'DataWithResponseInit'});
  });

});
