const express = require('express');
const {
  createFee,
  getAllFees,
  getFeeById,
  updateFee,
  deleteFee,
} = require('../controller/feeController');

const router = express.Router();

// Get all fees
router.get('/', getAllFees);

// Get fee by ID
router.get('/:id', getFeeById);

// Create fee
router.post('/', createFee);

// Update fee
router.put('/:id', updateFee);

// Delete fee
router.delete('/:id', deleteFee);

module.exports = router;
