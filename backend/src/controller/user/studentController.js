const pool = require('../../database/db');

// Get all students
async function getAllStudents(req, res) {
  try {
    const result = await pool.query("SELECT * FROM users WHERE role = 'student'");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAllStudents };
