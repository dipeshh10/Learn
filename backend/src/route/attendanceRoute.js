const express = require('express');
const {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} = require('../controller/attendanceController');

const router = express.Router();

// Get all attendance
router.get('/', getAllAttendance);

// Get attendance by ID
router.get('/:id', getAttendanceById);

// Create attendance
router.post('/', createAttendance);

// Update attendance
router.put('/:id', updateAttendance);

// Delete attendance
router.delete('/:id', deleteAttendance);

module.exports = router;
