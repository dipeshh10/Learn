const pool = require('../database/db');

// Create Attendance
async function createAttendance(req, res) {
  const { student_id, date, status } = req.body;
  const teacher_id = req.user.id;
  try {
    const result = await pool.query(
      'INSERT INTO attendance (student_id, teacher_id, date, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [student_id, teacher_id, date, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get All Attendance (admin/teacher)
async function getAllAttendance(req, res) {
  try {
    let result;
    if (req.user.role === 'admin') {
      result = await pool.query('SELECT * FROM attendance');
    } else if (req.user.role === 'teacher') {
      result = await pool.query('SELECT * FROM attendance WHERE teacher_id = $1', [req.user.id]);
    } else {
      return res.sendStatus(403);
    }
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get Attendance for a Student (student only)
async function getStudentAttendance(req, res) {
  try {
    const result = await pool.query('SELECT * FROM attendance WHERE student_id = $1', [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update Attendance (teacher only)
async function updateAttendance(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE attendance SET status=$1 WHERE id=$2 AND teacher_id=$3 RETURNING *',
      [status, id, req.user.id]
    );
    if (result.rows.length === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete Attendance (admin/teacher)
async function deleteAttendance(req, res) {
  const { id } = req.params;
  try {
    let result;
    if (req.user.role === 'admin') {
      result = await pool.query('DELETE FROM attendance WHERE id=$1 RETURNING *', [id]);
    } else if (req.user.role === 'teacher') {
      result = await pool.query('DELETE FROM attendance WHERE id=$1 AND teacher_id=$2 RETURNING *', [id, req.user.id]);
    } else {
      return res.sendStatus(403);
    }
    if (result.rows.length === 0) return res.sendStatus(404);
    res.json({ message: 'Attendance deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createAttendance,
  getAllAttendance,
  getStudentAttendance,
  updateAttendance,
  deleteAttendance,
};
