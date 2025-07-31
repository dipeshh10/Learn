const pool = require('../database/db');

// Create Learning Material
async function createLearningMaterial(req, res) {
  const { title, description, file_url } = req.body;
  const uploaded_by = req.user.id;
  try {
    const result = await pool.query(
      'INSERT INTO learning_materials (title, description, file_url, uploaded_by) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, file_url, uploaded_by]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get All Learning Materials
async function getAllLearningMaterials(req, res) {
  try {
    const result = await pool.query('SELECT * FROM learning_materials');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update Learning Material
async function updateLearningMaterial(req, res) {
  const { id } = req.params;
  const { title, description, file_url } = req.body;
  try {
    const result = await pool.query(
      'UPDATE learning_materials SET title=$1, description=$2, file_url=$3 WHERE id=$4 RETURNING *',
      [title, description, file_url, id]
    );
    if (result.rows.length === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete Learning Material
async function deleteLearningMaterial(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM learning_materials WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.sendStatus(404);
    res.json({ message: 'Learning material deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createLearningMaterial,
  getAllLearningMaterials,
  updateLearningMaterial,
  deleteLearningMaterial,
};
