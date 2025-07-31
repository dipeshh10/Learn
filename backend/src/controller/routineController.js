const pool = require('../database/db');

// Create Routine
async function createRoutine(req, res) {
  const { title, description, scheduled_at } = req.body;
  const created_by = req.user.id;
  try {
    const result = await pool.query(
      'INSERT INTO routines (title, description, scheduled_at, created_by) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, scheduled_at, created_by]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get All Routines
async function getAllRoutines(req, res) {
  try {
    const result = await pool.query('SELECT * FROM routines');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update Routine
async function updateRoutine(req, res) {
  const { id } = req.params;
  const { title, description, scheduled_at } = req.body;
  try {
    const result = await pool.query(
      'UPDATE routines SET title=$1, description=$2, scheduled_at=$3 WHERE id=$4 RETURNING *',
      [title, description, scheduled_at, id]
    );
    if (result.rows.length === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete Routine
async function deleteRoutine(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM routines WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.sendStatus(404);
    res.json({ message: 'Routine deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createRoutine,
  getAllRoutines,
  updateRoutine,
  deleteRoutine,
};
