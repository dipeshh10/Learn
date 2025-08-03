const { Fee, Student, User } = require('../models');

// Create Fee
const createFee = async (req, res) => {
  try {
    const { studentName, class: className, amount, status, dueDate, paidDate, paymentMethod, remarks } = req.body;
    const createdBy = 'default-admin-id'; // For now, we'll use a default admin ID
    
    // Try to find student by name to get studentId
    let studentId = null;
    const student = await Student.findOne({ where: { name: studentName } });
    if (student) {
      studentId = student.id;
    }
    
    const fee = await Fee.create({
      studentId,
      studentName,
      class: className,
      amount,
      status: status || 'Pending',
      dueDate,
      paidDate,
      paymentMethod,
      remarks,
      createdBy
    });
    
    res.status(201).json(fee);
  } catch (error) {
    console.error('Error creating fee:', error);
    res.status(500).json({ error: 'Failed to create fee' });
  }
};

// Get All Fees
const getAllFees = async (req, res) => {
  try {
    const fees = await Fee.findAll({
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email', 'course'],
          required: false
        }
      ],
      order: [['dueDate', 'ASC']]
    });
    
    res.json(fees);
  } catch (error) {
    console.error('Error fetching fees:', error);
    res.status(500).json({ error: 'Failed to fetch fees' });
  }
};

// Get Fee by ID
const getFeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const fee = await Fee.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email', 'course'],
          required: false
        }
      ]
    });
    
    if (!fee) {
      return res.status(404).json({ error: 'Fee record not found' });
    }
    
    res.json(fee);
  } catch (error) {
    console.error('Error fetching fee:', error);
    res.status(500).json({ error: 'Failed to fetch fee' });
  }
};

// Update Fee
const updateFee = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentName, class: className, amount, status, dueDate, paidDate, paymentMethod, remarks } = req.body;
    
    const fee = await Fee.findByPk(id);
    if (!fee) {
      return res.status(404).json({ error: 'Fee record not found' });
    }
    
    // Try to find student by name to get studentId
    let studentId = fee.studentId;
    const student = await Student.findOne({ where: { name: studentName } });
    if (student) {
      studentId = student.id;
    }
    
    await fee.update({
      studentId,
      studentName,
      class: className,
      amount,
      status,
      dueDate,
      paidDate,
      paymentMethod,
      remarks
    });
    
    res.json(fee);
  } catch (error) {
    console.error('Error updating fee:', error);
    res.status(500).json({ error: 'Failed to update fee' });
  }
};

// Delete Fee
const deleteFee = async (req, res) => {
  try {
    const { id } = req.params;
    
    const fee = await Fee.findByPk(id);
    if (!fee) {
      return res.status(404).json({ error: 'Fee record not found' });
    }
    
    await fee.destroy();
    
    res.json({ message: 'Fee record deleted successfully' });
  } catch (error) {
    console.error('Error deleting fee:', error);
    res.status(500).json({ error: 'Failed to delete fee' });
  }
};

module.exports = {
  createFee,
  getAllFees,
  getFeeById,
  updateFee,
  deleteFee
};
