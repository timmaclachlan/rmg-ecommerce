import { db } from '../data/db.js';

export function getProductById(id) {
  return db.products.getAll().find((p) => p.id === Number(id)) || null;
}

export function getProductsByCategory(category) {
  return db.products.getAll().filter((p) => p.category === category);
}

export function getProductsOnSale() {
  const res = db.products
    .getAll()
    .filter((p) => p.discountPercentage && p.discountPercentage > 0);
  return res;
}

export function getProductsBySearchTerm(searchTerm) {
  const res = db.products
    .getAll()
    .filter((p) => p.title?.toLowerCase().includes(searchTerm.toLowerCase()));
  return res;
}
