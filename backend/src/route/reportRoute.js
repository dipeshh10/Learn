const express = require('express');
const {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport
} = require('../controller/reportControllerNEW');

const router = express.Router();

// Get all reports
router.get('/', getAllReports);

// Get report by ID
router.get('/:id', getReportById);

// Create report
router.post('/', createReport);

// Update report
router.put('/:id', updateReport);

// Delete report
router.delete('/:id', deleteReport);

module.exports = router;
