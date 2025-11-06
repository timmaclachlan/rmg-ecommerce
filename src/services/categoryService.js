import { db } from '../mocks/db';

export const getAllCategories = () => {
  return db.categories;
};
