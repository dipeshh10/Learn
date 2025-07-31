const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');
const {
  createFee,
  getAllFees,
  updateFee,
  deleteFee,
} = require('../controller/feeController');

const router = express.Router();

// Admin: Create fee
router.post('/', authenticateToken, authorizeRole('admin'), createFee);
// Admin: Get all fees
router.get('/', authenticateToken, authorizeRole('admin'), getAllFees);
// Admin: Update fee
router.put('/:id', authenticateToken, authorizeRole('admin'), updateFee);
// Admin: Delete fee
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteFee);

module.exports = router;
