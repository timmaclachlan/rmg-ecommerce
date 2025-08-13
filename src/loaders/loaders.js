import { redirect } from 'react-router';
import axios from 'axios';

export const productLoader = async ({ params }) => {
  const { id } = params;
  if (!id) {
    throw redirect('/store/products/notfound');
  }

  const url = `https://dummyjson.com/products/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw redirect('/store/products/notfound'); 
      }
    }
    throw new Response('Failed to load product', { status: 500 });
  }
};

export const productsPageLoader = async ({request}) => {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');

  const [categoriesRes, productsRes] = await Promise.all([
    axios.get('https://dummyjson.com/products/category-list'),
      axios.get(`https://dummyjson.com/products/category/${category}`)
  ]);

  return {
    categories: categoriesRes.data,
    products: productsRes.data.products,
  };
};