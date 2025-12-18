// server/data/db.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, 'db.json');

/* ---------- helpers ---------- */

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

function ensureCollection(data, collection) {
  if (!Array.isArray(data[collection])) {
    throw new Error(`Collection "${collection}" does not exist in db.json`);
  }
}

/* ---------- generic CRUD ---------- */

function getAll(collection) {
  const data = readDB();
  ensureCollection(data, collection);
  return data[collection];
}

function getById(collection, id) {
  return getAll(collection).find((item) => item.id === id);
}

function add(collection, item) {
  const data = readDB();
  ensureCollection(data, collection);

  data[collection].push(item);
  writeDB(data);
  return item;
}

function update(collection, id, fields) {
  const data = readDB();
  ensureCollection(data, collection);

  const entity = data[collection].find((item) => item.id === id);
  if (!entity) return null;

  Object.assign(entity, fields);
  writeDB(data);
  return entity;
}

function remove(collection, id) {
  const data = readDB();
  ensureCollection(data, collection);

  const index = data[collection].findIndex((item) => item.id === id);
  if (index === -1) return false;

  data[collection].splice(index, 1);
  writeDB(data);
  return true;
}

/* ---------- public API ---------- */

export const db = {
  // Generic API
  getAll,
  getById,
  add,
  update,
  remove,

  // Optional semantic aliases (nice DX)
  products: {
    getAll: () => getAll('products'),
    getById: (id) => getById('products', id),
    add: (product) => add('products', product),
    update: (id, fields) => update('products', id, fields),
    remove: (id) => remove('products', id),
  },

  customers: {
    getAll: () => getAll('customers'),
    getById: (id) => getById('customers', id),
    add: (customer) => add('customers', customer),
    update: (id, fields) => update('customers', id, fields),
    remove: (id) => remove('customers', id),
  },

  baskets: {
    getAll: () => getAll('baskets'),
    getById: (id) => getById('baskets', id),
    add: (basket) => add('baskets', basket),
    update: (id, fields) => update('baskets', id, fields),
    remove: (id) => remove('baskets', id),
  },
};
