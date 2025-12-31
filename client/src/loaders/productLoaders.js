import { data } from 'react-router-dom';
import axios from 'axios';

export const productLoader = async (params) => {
  const id = params.id;
  if (!id) {
    throw data({ message: 'No product ID provided' }, { status: 400 });
  }

  try {
    const response = await axios.get(`/api/products/${id}`);
    return response.data;
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
    // Always load categories
    const categoriesRes = await axios.get('/api/categories');

    let productsRes;

    if (searchTerm) {
      console.log(`Loading products with search term: ${searchTerm}`);
      productsRes = await axios.get(
        `/api/product?search=${encodeURIComponent(searchTerm)}`,
      );
    } else if (category) {
      console.log(`Loading products in category: ${category}`);
      productsRes = await axios.get(`/api/products/categories/${category}`);
    } else {
      console.log('No category selected — loading products on sale');
      productsRes = await axios.get('/api/products/onsale');
    }

    if (category && productsRes.data.length === 0) {
      throw data(
        { message: `Category "${category}" is empty` },
        { status: 404 },
      );
    }

    return {
      categories: categoriesRes.data,
      products: productsRes.data,
    };
  } catch (error) {
    throw data(
      { message: 'Failed to load data: ' + error.message },
      { status: 500 },
    );
  }
};
