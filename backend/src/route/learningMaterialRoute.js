const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');
const {
  createLearningMaterial,
  getAllLearningMaterials,
  updateLearningMaterial,
  deleteLearningMaterial,
} = require('../controller/learningMaterialController');

const router = express.Router();

// Admin: Create learning material
router.post('/', authenticateToken, authorizeRole('admin'), createLearningMaterial);
// All: Get all learning materials
router.get('/', authenticateToken, getAllLearningMaterials);
// Admin: Update learning material
router.put('/:id', authenticateToken, authorizeRole('admin'), updateLearningMaterial);
// Admin: Delete learning material
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteLearningMaterial);

module.exports = router;
