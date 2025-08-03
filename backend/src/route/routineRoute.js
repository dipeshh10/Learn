const express = require('express');
const {
  createRoutine,
  getAllRoutines,
  getRoutineById,
  updateRoutine,
  deleteRoutine,
} = require('../controller/routineControllerNEW');

console.log('RoutineRoute imports:', {
  createRoutine: typeof createRoutine,
  getAllRoutines: typeof getAllRoutines,
  getRoutineById: typeof getRoutineById,
  updateRoutine: typeof updateRoutine,
  deleteRoutine: typeof deleteRoutine
});

if ([createRoutine, getAllRoutines, getRoutineById, updateRoutine, deleteRoutine].some(fn => typeof fn !== 'function')) {
  throw new Error('One or more routine handlers are undefined or not functions. Check routineController.js exports.');
}

const router = express.Router();

// Get all routines
router.get('/', getAllRoutines);

// Get routine by ID
router.get('/:id', getRoutineById);

// Create routine
router.post('/', createRoutine);

// Update routine
router.put('/:id', updateRoutine);

// Delete routine
router.delete('/:id', deleteRoutine);

module.exports = router;
