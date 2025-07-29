const express = require('express');
const router = express.Router();
const { Fee } = require('../models');

function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Forbidden: Admins only' });
}

// Get all fees (all roles)
router.get('/', async (req, res) => {
  try {
    const fees = await Fee.findAll();
    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch fees', error: err.message });
  }
});

// Add fee (admin only)
router.post('/', isAdmin, async (req, res) => {
  try {
    const { studentName, amount, status } = req.body;
    const fee = await Fee.create({ studentName, amount, status });
    res.status(201).json(fee);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add fee', error: err.message });
  }
});

// Edit fee (admin only)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const { studentName, amount, status } = req.body;
    const fee = await Fee.findByPk(req.params.id);
    if (!fee) return res.status(404).json({ message: 'Fee not found' });
    await fee.update({ studentName, amount, status });
    res.json(fee);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update fee', error: err.message });
  }
});

// Delete fee (admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const fee = await Fee.findByPk(req.params.id);
    if (!fee) return res.status(404).json({ message: 'Fee not found' });
    await fee.destroy();
    res.json({ message: 'Fee deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete fee', error: err.message });
  }
});

module.exports = router; 