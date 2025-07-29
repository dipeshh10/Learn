const express = require('express');
const router = express.Router();
const { LearningMaterial } = require('../models');

function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Forbidden: Admins only' });
}

// Get all learning materials (all roles)
router.get('/', async (req, res) => {
  try {
    const materials = await LearningMaterial.findAll();
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch learning materials', error: err.message });
  }
});

// Add learning material (admin only)
router.post('/', isAdmin, async (req, res) => {
  try {
    const { title, type, link } = req.body;
    const material = await LearningMaterial.create({ title, type, link });
    res.status(201).json(material);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add learning material', error: err.message });
  }
});

// Edit learning material (admin only)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const { title, type, link } = req.body;
    const material = await LearningMaterial.findByPk(req.params.id);
    if (!material) return res.status(404).json({ message: 'Learning material not found' });
    await material.update({ title, type, link });
    res.json(material);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update learning material', error: err.message });
  }
});

// Delete learning material (admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const material = await LearningMaterial.findByPk(req.params.id);
    if (!material) return res.status(404).json({ message: 'Learning material not found' });
    await material.destroy();
    res.json({ message: 'Learning material deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete learning material', error: err.message });
  }
});

module.exports = router; 