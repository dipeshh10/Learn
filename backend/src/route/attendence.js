const express = require('express');
const router = express.Router();
const { Attendance } = require('../models');

// Get all attendance records
router.get('/', async (req, res) => {
  try {
    const records = await Attendance.findAll();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new attendance record
router.post('/', async (req, res) => {
  try {
    const { studentName, date, status } = req.body;
    const record = await Attendance.create({ studentName, date, status });
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update attendance record
router.put('/:id', async (req, res) => {
  try {
    const { studentName, date, status } = req.body;
    const record = await Attendance.findByPk(req.params.id);
    if (!record) return res.status(404).json({ error: 'Not found' });
    await record.update({ studentName, date, status });
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete attendance record
router.delete('/:id', async (req, res) => {
  try {
    const record = await Attendance.findByPk(req.params.id);
    if (!record) return res.status(404).json({ error: 'Not found' });
    await record.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 