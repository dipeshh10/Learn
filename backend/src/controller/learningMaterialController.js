const { LearningMaterial, User } = require('../models');

// Create Learning Material
const createLearningMaterial = async (req, res) => {
  try {
    const { title, type, url, description, subject } = req.body;
    const createdBy = 'default-admin-id'; // For now, we'll use a default admin ID
    
    const learningMaterial = await LearningMaterial.create({
      title,
      type,
      url,
      description,
      subject,
      createdBy
    });
    
    res.status(201).json(learningMaterial);
  } catch (error) {
    console.error('Error creating learning material:', error);
    res.status(500).json({ error: 'Failed to create learning material' });
  }
};

// Get All Learning Materials
const getAllLearningMaterials = async (req, res) => {
  try {
    const learningMaterials = await LearningMaterial.findAll({
      where: { isPublished: true },
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['name', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.json(learningMaterials);
  } catch (error) {
    console.error('Error fetching learning materials:', error);
    res.status(500).json({ error: 'Failed to fetch learning materials' });
  }
};

// Get Learning Material by ID
const getLearningMaterialById = async (req, res) => {
  try {
    const { id } = req.params;
    const learningMaterial = await LearningMaterial.findByPk(id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['name', 'email']
        }
      ]
    });
    
    if (!learningMaterial || !learningMaterial.isPublished) {
      return res.status(404).json({ error: 'Learning material not found' });
    }
    
    res.json(learningMaterial);
  } catch (error) {
    console.error('Error fetching learning material:', error);
    res.status(500).json({ error: 'Failed to fetch learning material' });
  }
};

// Update Learning Material
const updateLearningMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, url, description, subject } = req.body;
    
    const learningMaterial = await LearningMaterial.findByPk(id);
    if (!learningMaterial) {
      return res.status(404).json({ error: 'Learning material not found' });
    }
    
    await learningMaterial.update({
      title,
      type,
      url,
      description,
      subject
    });
    
    res.json(learningMaterial);
  } catch (error) {
    console.error('Error updating learning material:', error);
    res.status(500).json({ error: 'Failed to update learning material' });
  }
};

// Delete Learning Material
const deleteLearningMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    
    const learningMaterial = await LearningMaterial.findByPk(id);
    if (!learningMaterial) {
      return res.status(404).json({ error: 'Learning material not found' });
    }
    
    await learningMaterial.destroy();
    
    res.json({ message: 'Learning material deleted successfully' });
  } catch (error) {
    console.error('Error deleting learning material:', error);
    res.status(500).json({ error: 'Failed to delete learning material' });
  }
};

module.exports = {
  createLearningMaterial,
  getAllLearningMaterials,
  getLearningMaterialById,
  updateLearningMaterial,
  deleteLearningMaterial
};
