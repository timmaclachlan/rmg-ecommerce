// server/routes/customer.js
import express from 'express';
import {
  getCustomerById,
  updateCustomer,
} from '../services/customerService.js';

const router = express.Router();

/**
 * GET /api/customer/:id
 */
router.get('/:id', (req, res) => {
  console.log('Express GET /api/customer/:id');

  const id = Number(req.params.id);
  const customer = getCustomerById(id);

  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  res.json({
    success: true,
    data: customer,
  });
});

/**
 * PUT /api/customer/:id
 */
router.put('/:id', (req, res) => {
  console.log('Express PUT /api/customer/:id');

  const id = Number(req.params.id);
  const fields = req.body;

  const updatedCustomer = updateCustomer(id, fields);

  if (!updatedCustomer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  res.json({
    success: true,
    data: updateCustomer,
  });
});

export default router;
