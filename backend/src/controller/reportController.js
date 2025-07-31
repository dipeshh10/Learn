const pool = require('../database/db');

// Create Report
async function createReport(req, res) {
  const { student_id, report_text } = req.body;
  const teacher_id = req.user.id;
  try {
    const result = await pool.query(
      'INSERT INTO reports (student_id, teacher_id, report_text) VALUES ($1, $2, $3) RETURNING *',
      [student_id, teacher_id, report_text]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get All Reports (admin/teacher)
async function getAllReports(req, res) {
  try {
    let result;
    if (req.user.role === 'admin') {
      result = await pool.query('SELECT * FROM reports');
    } else if (req.user.role === 'teacher') {
      result = await pool.query('SELECT * FROM reports WHERE teacher_id = $1', [req.user.id]);
    } else {
      return res.sendStatus(403);
    }
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get Reports for a Student (student only)
async function getStudentReports(req, res) {
  try {
    const result = await pool.query('SELECT * FROM reports WHERE student_id = $1', [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update Report (teacher only)
async function updateReport(req, res) {
  const { id } = req.params;
  const { report_text } = req.body;
  try {
    const result = await pool.query(
      'UPDATE reports SET report_text=$1 WHERE id=$2 AND teacher_id=$3 RETURNING *',
      [report_text, id, req.user.id]
    );
    if (result.rows.length === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete Report (admin/teacher)
async function deleteReport(req, res) {
  const { id } = req.params;
  try {
    let result;
    if (req.user.role === 'admin') {
      result = await pool.query('DELETE FROM reports WHERE id=$1 RETURNING *', [id]);
    } else if (req.user.role === 'teacher') {
      result = await pool.query('DELETE FROM reports WHERE id=$1 AND teacher_id=$2 RETURNING *', [id, req.user.id]);
    } else {
      return res.sendStatus(403);
    }
    if (result.rows.length === 0) return res.sendStatus(404);
    res.json({ message: 'Report deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createReport,
  getAllReports,
  getStudentReports,
  updateReport,
  deleteReport,
};
