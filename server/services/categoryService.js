import { db } from '../data/db.js';

export const getAllCategories = () => {
  return db.categories;
};
