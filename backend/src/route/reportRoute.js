const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');
const {
  createReport,
  getAllReports,
  getStudentReports,
  updateReport,
  deleteReport,
} = require('../controller/reportController');

const router = express.Router();

// Teacher: Create report
router.post('/', authenticateToken, authorizeRole('teacher'), createReport);
// Admin/Teacher: Get all reports
router.get('/all', authenticateToken, authorizeRole('admin', 'teacher'), getAllReports);
// Student: Get own reports
router.get('/', authenticateToken, authorizeRole('student'), getStudentReports);
// Teacher: Update report
router.put('/:id', authenticateToken, authorizeRole('teacher'), updateReport);
// Admin/Teacher: Delete report
router.delete('/:id', authenticateToken, authorizeRole('admin', 'teacher'), deleteReport);

module.exports = router;
