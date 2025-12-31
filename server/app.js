import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import productRoutes from './routes/product.js';
import customerRoutes from './routes/customer.js';
import basketRoutes from './routes/basket.js';
import categoryRoutes from './routes/category.js';

const app = express();

// Middlewares
app.use(cors()); // allow React dev server
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(` logger ${req.method} ${req.url}`);
  next();
});

// API routes
app.use('/api/products', productRoutes); // change from /api/products to /api/product
app.use('/api/customers', customerRoutes);
app.use('/api/baskets', basketRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/api/crash', (req, res, next) => {
  throw new Error('Boom!');
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

export default app;
