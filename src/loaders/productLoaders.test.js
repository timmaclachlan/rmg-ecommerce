import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { productLoader, productsPageLoader } from './productLoaders';

let mock;

beforeEach(() => {
  mock = new AxiosMockAdapter(axios);
});

afterEach(() => {
  mock.reset();
});

describe('productLoader', () => {
  test('returns product data for valid ID', async () => {
    mock.onGet('/api/products/1').reply(200, {
      id: 1,
      title: 'Essence Mascara Lash Princess',
      price: 9.99,
    });

    const result = await productLoader({ id: '1' });

    expect(result).toMatchObject({
      id: 1,
      title: 'Essence Mascara Lash Princess',
      price: 9.99,
    });
  });

  test('throws 404 error for missing product', async () => {
    mock.onGet('/api/products/404').reply(404);

    await expect(productLoader({ id: '404' })).rejects.toMatchObject({
      data: { message: 'Product not found' },
      init: { status: 404 },
      type: 'DataWithResponseInit',
    });
  });

  test('throws 400 error for missing ID', async () => {
    await expect(productLoader({ id: '' })).rejects.toMatchObject({
      data: { message: 'No product ID provided' },
      init: { status: 400 },
      type: 'DataWithResponseInit',
    });
  });
});

describe('productsPageLoader', () => {
  test('returns products and categories for valid category', async () => {
    mock
      .onGet('/api/categories')
      .reply(200, [{ slug: 'mens-shirts', name: 'Men’s Shirts' }]);

    mock.onGet('/api/products/category/mens-shirts').reply(200, [
      { id: 83, title: 'Blue & Black Check Shirt' },
      { id: 84, title: 'Gigabyte Aorus Men Tshirt' },
    ]);

    const result = await productsPageLoader({
      params: { category: 'mens-shirts' },
    });

    expect(result.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 83, title: 'Blue & Black Check Shirt' }),
        expect.objectContaining({ id: 84, title: 'Gigabyte Aorus Men Tshirt' }),
      ]),
    );
  });
});
