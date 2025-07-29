const express = require('express');
const router = express.Router();
const { Report } = require('../models');

function isTeacher(req, res, next) {
  if (req.user && req.user.role === 'teacher') return next();
  return res.status(403).json({ message: 'Forbidden: Teachers only' });
}

// Get all reports (all roles)
router.get('/', async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reports', error: err.message });
  }
});

// Add report (teacher only)
router.post('/', isTeacher, async (req, res) => {
  try {
    const { title, studentName, grades } = req.body;
    const report = await Report.create({ title, studentName, grades });
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add report', error: err.message });
  }
});

// Edit report (teacher only)
router.put('/:id', isTeacher, async (req, res) => {
  try {
    const { title, studentName, grades } = req.body;
    const report = await Report.findByPk(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    await report.update({ title, studentName, grades });
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update report', error: err.message });
  }
});

// Delete report (teacher only)
router.delete('/:id', isTeacher, async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    await report.destroy();
    res.json({ message: 'Report deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete report', error: err.message });
  }
});

module.exports = router; 