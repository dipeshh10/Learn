const pool = require('../database/db');

// Create Fee
async function createFee(req, res) {
  const { student_id, amount, due_date, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO fees (student_id, amount, due_date, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [student_id, amount, due_date, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get All Fees
async function getAllFees(req, res) {
  try {
    const result = await pool.query('SELECT * FROM fees');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update Fee
async function updateFee(req, res) {
  const { id } = req.params;
  const { amount, due_date, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE fees SET amount=$1, due_date=$2, status=$3 WHERE id=$4 RETURNING *',
      [amount, due_date, status, id]
    );
    if (result.rows.length === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete Fee
async function deleteFee(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM fees WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.sendStatus(404);
    res.json({ message: 'Fee deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createFee,
  getAllFees,
  updateFee,
  deleteFee,
};
