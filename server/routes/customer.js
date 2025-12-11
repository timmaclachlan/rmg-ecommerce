// /server/customerRoutes.js
import express from 'express';
import {
  getCustomerById,
  updateCustomer,
} from '../services/customerService.js';

const router = express.Router();

// GET customer by ID
router.get('/:customerId', (req, res) => {
  console.log('Express GET /api/customer/:customerId');
  const { customerId } = req.params;
  const customer = getCustomerById(customerId);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  res.status(200).json(customer);
});

// PUT update customer
router.put('/', express.json(), (req, res) => {
  console.log('Express PUT /api/customer');
  const updatedCustomer = req.body;
  const result = updateCustomer(updatedCustomer);
  if (!result) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  res.status(200).json(result);
});

export default router;
