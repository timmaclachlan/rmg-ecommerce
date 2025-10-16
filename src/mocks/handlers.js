import { http, HttpResponse } from 'msw';
import db from './db.json';

export const handlers = [
  http.get('http://localhost/api/products/categories', () => {
    console.log('MSW intercepted /api/products/categories');
    return HttpResponse.json(db.categories);
  }),

  http.get('http://localhost/api/products/category/:category', ({ params }) => {
    console.log(`Intercepted category: ${params.category}`);
    const products = db.products.filter(p => p.category === params.category);
    return HttpResponse.json(products);
  }),

  http.get('http://localhost/api/products/:id', ({ params }) => {
    console.log(`MSW intercepted /api/products/${params.id}`);
    const product = db.products.find(p => p.id === parseInt(params.id));
    if (product) {
      return HttpResponse.json(product);
    } else {
      return HttpResponse.json({ message: 'Product not found' }, { status: 404 });
    }
  }),
];
