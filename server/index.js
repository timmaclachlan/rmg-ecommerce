import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import productRoutes from './routes/product.js';
import customerRoutes from './routes/customer.js';
import basketRoutes from './routes/basket.js';
import categoryRoutes from './routes/category.js';

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors()); // allow React dev server
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/product', productRoutes); // change from /api/products to /api/product
app.use('/api/customer', customerRoutes);
app.use('/api/basket', basketRoutes);
app.use('/api/category', categoryRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
