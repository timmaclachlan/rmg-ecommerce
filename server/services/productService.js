import { db } from '../data/db.js';

export function getProductById(id) {
  return db.products.find((p) => p.id === Number(id)) || null;
}

export function getProductsByCategory(category) {
  return db.products.filter((p) => p.category === category);
}

export function getProductsOnSale() {
  const res = db.products.filter(
    (p) => p.discountPercentage && p.discountPercentage > 0,
  );
  return res;
}

export function getProductsBySearchTerm(searchTerm) {
  const res = db.products.filter((p) =>
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return res;
}
