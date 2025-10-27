import { data } from 'react-router';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost';

export const productLoader = async (params) => {
  const id = params.id;
  if (!id) {
    throw data({ message: 'No product ID provided' }, { status: 400 });
  }

  const url = `/api/products/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw data({ message: 'Product not found' }, { status: 404 });
    }
    throw data({ message: 'Failed to load product' }, { status: 500 });
  }
};

export const productsPageLoader = async (params) => {
  const category = params.category;

  let categoriesRes = null;
  let productsRes = null;

  try {
    // always request categories
    const requests = [axios.get('/api/categories')];

    if (category) {
      // after getting category, request products in that category
      requests.push(axios.get(`/api/products/category/${category}`));
    }

    const responses = await Promise.all(requests);
    categoriesRes = responses[0];
    productsRes = category ? responses[1] : null;
  } catch (error) {
    throw data(
      { message: 'Failed to load data: ' + error.message },
      { status: 500 },
    );
  }

  if (category && productsRes?.data?.length === 0) {
    throw data({ message: `Category "${category}" is empty` }, { status: 404 });
  }

  return {
    categories: categoriesRes.data,
    products: productsRes?.data ?? [],
  };
};
