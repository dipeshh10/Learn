const express = require('express');
const router = express.Router();
const { Student } = require('../models');

// Middleware to check admin role
function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Forbidden: Admins only' });
}

// Get all students (all roles)
router.get('/', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch students', error: err.message });
  }
});

// Add student (admin only)
router.post('/', isAdmin, async (req, res) => {
  try {
    const { fullName, email, class: className } = req.body;
    const student = await Student.create({ fullName, email, class: className });
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add student', error: err.message });
  }
});

// Edit student (admin only)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const { fullName, email, class: className } = req.body;
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    await student.update({ fullName, email, class: className });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update student', error: err.message });
  }
});

// Delete student (admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    await student.destroy();
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete student', error: err.message });
  }
});

module.exports = router; 