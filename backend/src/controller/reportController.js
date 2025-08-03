const { Report, Student } = require('../models');
console.log('Report model loaded:', typeof Report);
console.log('Student model loaded:', typeof Student);

// Create Report
const createReport = async (req, res) => {
  try {
    const { title, studentName, grades, date, remarks } = req.body;
    const createdBy = 'default-admin-id'; // For now, we'll use a default admin ID
    
    // Try to find student by name to get studentId
    let studentId = null;
    const student = await Student.findOne({ where: { name: studentName } });
    if (student) {
      studentId = student.id;
    }
    
    const report = await Report.create({
      title,
      studentId,
      studentName,
      grades,
      date,
      remarks,
      createdBy
    });
    
    res.status(201).json(report);
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'Failed to create report' });
  }
};

// Get All Reports
const getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll({
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email', 'course'],
          required: false
        }
      ],
      order: [['date', 'DESC'], ['studentName']]
    });
    
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
};

// Get Report by ID
const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email', 'course'],
          required: false
        }
      ]
    });
    
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    
    res.json(report);
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ error: 'Failed to fetch report' });
  }
};

// Update Report
const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, studentName, grades, date, remarks } = req.body;
    
    const report = await Report.findByPk(id);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    
    // Try to find student by name to get studentId
    let studentId = report.studentId;
    const student = await Student.findOne({ where: { name: studentName } });
    if (student) {
      studentId = student.id;
    }
    
    await report.update({
      title,
      studentId,
      studentName,
      grades,
      date,
      remarks
    });
    
    res.json(report);
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ error: 'Failed to update report' });
  }
};

// Delete Report
const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    
    const report = await Report.findByPk(id);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    
    await report.destroy();
    
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ error: 'Failed to delete report' });
  }
};

module.exports = {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport
};
module.exports = {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport
};