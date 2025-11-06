import { db } from '../mocks/db';

export function getProductById(id) {
  return db.products.find((p) => p.id === Number(id)) || null;
}

export function getProductsByCategory(categoryId) {
  return db.products.filter((p) => p.category === categoryId);
}
