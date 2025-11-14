import { data } from 'react-router';
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

export const productsPageLoader = async (params) => {
  const category = params.category;

  try {
    // Always load categories
    const categoriesRes = await axios.get('/api/categories');

    let productsRes;

    if (category) {
      console.log(`Loading products in category: ${category}`);
      productsRes = await axios.get(`/api/products/category/${category}`);
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
