const express = require('express');
const {
  createLearningMaterial,
  getAllLearningMaterials,
  getLearningMaterialById,
  updateLearningMaterial,
  deleteLearningMaterial,
} = require('../controller/learningMaterialController');

const router = express.Router();

// Get all learning materials
router.get('/', getAllLearningMaterials);

// Get learning material by ID
router.get('/:id', getLearningMaterialById);

// Create learning material
router.post('/', createLearningMaterial);

// Update learning material
router.put('/:id', updateLearningMaterial);

// Delete learning material
router.delete('/:id', deleteLearningMaterial);

module.exports = router;
