const { Attendance, Student, User } = require('../models');

// Create Attendance
const createAttendance = async (req, res) => {
  try {
    const { studentName, class: className, date, status, remarks } = req.body;
    const markedBy = 'default-admin-id'; // For now, we'll use a default admin ID
    
    // Try to find student by name to get studentId
    let studentId = null;
    const student = await Student.findOne({ where: { name: studentName } });
    if (student) {
      studentId = student.id;
    }
    
    const attendance = await Attendance.create({
      studentId,
      studentName,
      class: className,
      date,
      status,
      remarks,
      markedBy
    });
    
    res.status(201).json(attendance);
  } catch (error) {
    console.error('Error creating attendance:', error);
    res.status(500).json({ error: 'Failed to create attendance' });
  }
};

// Get All Attendance
const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findAll({
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
    
    res.json(attendance);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
};

// Get Attendance by ID
const getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email', 'course'],
          required: false
        }
      ]
    });
    
    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    
    res.json(attendance);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
};

// Update Attendance
const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentName, class: className, date, status, remarks } = req.body;
    
    const attendance = await Attendance.findByPk(id);
    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    
    // Try to find student by name to get studentId
    let studentId = attendance.studentId;
    const student = await Student.findOne({ where: { name: studentName } });
    if (student) {
      studentId = student.id;
    }
    
    await attendance.update({
      studentId,
      studentName,
      class: className,
      date,
      status,
      remarks
    });
    
    res.json(attendance);
  } catch (error) {
    console.error('Error updating attendance:', error);
    res.status(500).json({ error: 'Failed to update attendance' });
  }
};

// Delete Attendance
const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    
    const attendance = await Attendance.findByPk(id);
    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    
    await attendance.destroy();
    
    res.json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    console.error('Error deleting attendance:', error);
    res.status(500).json({ error: 'Failed to delete attendance' });
  }
};

module.exports = {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance
};
