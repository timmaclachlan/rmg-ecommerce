// handlers.js
import { http, HttpResponse } from 'msw';
import db from "./db.json";

export const handlers = [
  http.get('https://dummyjson.com/products/categories', () => {
  console.log('MSW intercepted https://dummyjson.com/products/categories');
  return HttpResponse.json(db.categories);
}),



http.get('https://dummyjson.com/products/category/:category', ({params}) => {
console.log(params);
  console.log(`MSW intercepted https://dummyjson.com/products/category/${params.category}}`);
  var products = db.products.filter((p) => p.category === params.category);
  return HttpResponse.json(products);
}),

];
