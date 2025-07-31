const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');
const {
  createRoutine,
  getAllRoutines,
  updateRoutine,
  deleteRoutine,
} = require('../controller/routineController');

const router = express.Router();

// Admin: Create routine
router.post('/', authenticateToken, authorizeRole('admin'), createRoutine);
// All: Get all routines
router.get('/', authenticateToken, getAllRoutines);
// Admin: Update routine
router.put('/:id', authenticateToken, authorizeRole('admin'), updateRoutine);
// Admin: Delete routine
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteRoutine);

module.exports = router;
