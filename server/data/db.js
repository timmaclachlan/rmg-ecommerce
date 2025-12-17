// server/data/db.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, 'db.json');

// Read db.json at runtime
function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

// Helper: write JSON to disk
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// Export structured db object
export const db = {
  baskets: readDB.baskets || [],
  customers: readDB.customers || [],
  products: readDB.products || [],
  categories: readDB.categories || [],

  addProduct(product) {
    const data = readDB();
    data.products.push(product);
    writeDB(data);
    return product;
  },

  updateProduct(id, updatedFields) {
    const data = readDB();
    const product = data.products.find((p) => p.id === id);
    if (!product) return null;
    Object.assign(product, updatedFields);
    writeDB(data);
    return product;
  },

  deleteProduct(id) {
    const data = readDB();
    const index = data.products.findIndex((p) => p.id === id);
    if (index === -1) return false;
    data.products.splice(index, 1);
    writeDB(data);
    return true;
  },

  addCustomer(customer) {
    const data = readDB();
    data.customers.push(customer);
    writeDB(data);
    return customer;
  },

  updateCustomer(id, updatedFields) {
    const data = readDB();
    const customer = data.customers.find((p) => p.id === id);
    if (!customer) return null;
    Object.assign(customer, updatedFields);
    writeDB(data);
    return customer;
  },
};
