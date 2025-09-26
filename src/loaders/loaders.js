import { data } from 'react-router';
import axios from 'axios';

export const productLoader = async ({ params }) => {
  const { id } = params;
  if (!id) {
    throw data({ message: 'No product ID provided' }, { status: 400});
  }

  const url = `https://dummyjson.com/products/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw data({ message: 'Product not found' }, { status: 404 });
      }
    }
    throw data({ message: 'Failed to load product' }, { status: 500 });
  }
};

export const productsPageLoader = async (params) => {

  const category = params.category;

  let categoriesRes, productsRes;

try {
    [categoriesRes, productsRes] = await Promise.all([
      axios.get('https://dummyjson.com/products/categories'),
      axios.get(`https://dummyjson.com/products/category/${category}`)
    ]);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw data({ message: `Category "${category}" not found` }, { status: 404 });
    }
    throw data({ message: 'Failed to load products: ' + error.message }, { status: 500 });
  }

  // ✅ Now this check won't be caught by the catch block
  if (productsRes.data.length === 0 && category) {
    throw data({ message: `Category "${category}" is empty` }, { status: 404 });
  }

  return {
    categories: categoriesRes.data,
    products: productsRes.data,
  };
};