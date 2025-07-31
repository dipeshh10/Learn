const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');
const {
  createAttendance,
  getAllAttendance,
  getStudentAttendance,
  updateAttendance,
  deleteAttendance,
} = require('../controller/attendanceController');

const router = express.Router();

// Teacher: Create attendance
router.post('/', authenticateToken, authorizeRole('teacher'), createAttendance);
// Admin/Teacher: Get all attendance
router.get('/all', authenticateToken, authorizeRole('admin', 'teacher'), getAllAttendance);
// Student: Get own attendance
router.get('/', authenticateToken, authorizeRole('student'), getStudentAttendance);
// Teacher: Update attendance
router.put('/:id', authenticateToken, authorizeRole('teacher'), updateAttendance);
// Admin/Teacher: Delete attendance
router.delete('/:id', authenticateToken, authorizeRole('admin', 'teacher'), deleteAttendance);

module.exports = router;
