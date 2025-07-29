const express = require('express');
const router = express.Router();
const { Routine } = require('../models');

// Middleware to check admin role
function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Forbidden: Admins only' });
}

// Get all routines (all roles)
router.get('/', async (req, res) => {
  try {
    const routines = await Routine.findAll();
    res.json(routines);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch routines', error: err.message });
  }
});

// Add routine (admin only)
router.post('/', isAdmin, async (req, res) => {
  try {
    const { day, class: className, time } = req.body;
    const routine = await Routine.create({ day, class: className, time });
    res.status(201).json(routine);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add routine', error: err.message });
  }
});

// Edit routine (admin only)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const { day, class: className, time } = req.body;
    const routine = await Routine.findByPk(req.params.id);
    if (!routine) return res.status(404).json({ message: 'Routine not found' });
    await routine.update({ day, class: className, time });
    res.json(routine);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update routine', error: err.message });
  }
});

// Delete routine (admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const routine = await Routine.findByPk(req.params.id);
    if (!routine) return res.status(404).json({ message: 'Routine not found' });
    await routine.destroy();
    res.json({ message: 'Routine deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete routine', error: err.message });
  }
});

module.exports = router; 