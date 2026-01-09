import { data } from 'react-router-dom';
import axios from 'axios';

export const productLoader = async (params) => {
  const id = params.id;
  if (!id) {
    throw data({ message: 'No product ID provided' }, { status: 400 });
  }

  try {
    const response = await axios.get(`/api/products/${id}`);

    if (!response.data.success) {
      throw new Error('Invalid API response');
    }

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw data({ message: 'Product not found' }, { status: 404 });
    }

    throw data({ message: 'Failed to load product' }, { status: 500 });
  }
};

export const productsPageLoader = async (args = {}) => {
  const { request, search, params = {} } = args;

  // Get searchTerm from search params (RR loader) OR from params (manual test call)
  let searchTerm = '';

  if (request) {
    // React Router case
    const url = new URL(request.url);
    searchTerm = url.searchParams.get('search') || '';
  } else if (search !== undefined) {
    // Manual call from HomeContent
    searchTerm = search;
  } else if (params.search) {
    searchTerm = params.search;
  }

  const category = params.category || '';

  try {
    // Load categories
    const categoriesRes = await axios.get('/api/categories');

    if (!categoriesRes.data.success) {
      throw new Error('Failed to load categories');
    }

    let productsRes;

    if (searchTerm) {
      console.log(`Loading products with search term: ${searchTerm}`);
      productsRes = await axios.get(
        `/api/products?search=${encodeURIComponent(searchTerm)}`,
      );
    } else if (category) {
      console.log(`Loading products in category: ${category}`);
      productsRes = await axios.get(`/api/products/category/${category}`);
    } else {
      console.log('No category selected — loading products on sale');
      productsRes = await axios.get('/api/products/onsale');
    }

    if (!productsRes.data.success) {
      throw new Error('Failed to load products');
    }

    const products = productsRes.data.data;
    const categories = categoriesRes.data.data;

    if (category && products.length === 0) {
      throw data(
        { message: `Category "${category}" is empty` },
        { status: 404 },
      );
    }

    return {
      categories,
      products,
    };
  } catch (error) {
    throw data({ message: `Failed to load data:${error}` }, { status: 500 });
  }
};
