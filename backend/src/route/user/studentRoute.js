const express = require('express');
const { 
  getAllStudents, 
  getStudentById, 
  createStudent, 
  updateStudent, 
  deleteStudent 
} = require('../../controller/user/studentController');

const router = express.Router();

// Get all students
router.get('/', getAllStudents);

// Get student by ID
router.get('/:id', getStudentById);

// Create new student
router.post('/', createStudent);

// Update student
router.put('/:id', updateStudent);

// Delete student
router.delete('/:id', deleteStudent);

module.exports = router;
