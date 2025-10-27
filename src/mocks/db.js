import raw from './db.json';

//Keep db.json as your source of truth
//Easily reset state between tests or reloads
//Avoid mutation of the original JSON file

export const db = {
  baskets: raw.baskets || [],
  products: raw.products || [],
  categories: raw.categories || []
};