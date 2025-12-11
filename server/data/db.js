// server/data/db.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read db.json at runtime
const rawData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'),
);

// Export structured db object
export const db = {
  baskets: rawData.baskets || [],
  customers: rawData.customers || [],
  products: rawData.products || [],
  categories: rawData.categories || [],
};
