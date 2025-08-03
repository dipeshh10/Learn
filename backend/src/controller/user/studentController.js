// Student controller with database integration
const db = require('../../models');
const Student = db.Student;

// Fallback data for when database is not available
const fallbackStudents = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@student.com',
    course: 'Computer Science',
    fees: '5000',
    enrollmentDate: '2024-01-15',
    isActive: true,
    phone: '123-456-7890',
    address: '123 Student St',
    dateOfBirth: '2000-05-15',
    guardianName: 'Robert Smith',
    guardianPhone: '123-456-7891',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily.johnson@student.com',
    course: 'Mathematics',
    fees: '4500',
    enrollmentDate: '2024-02-01',
    isActive: true,
    phone: '098-765-4321',
    address: '456 College Ave',
    dateOfBirth: '2001-03-20',
    guardianName: 'Mary Johnson',
    guardianPhone: '098-765-4322',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@student.com',
    course: 'Physics',
    fees: '4800',
    enrollmentDate: '2024-01-20',
    isActive: true,
    phone: '555-123-4567',
    address: '789 University Blvd',
    dateOfBirth: '1999-12-10',
    guardianName: 'David Brown',
    guardianPhone: '555-123-4568',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

let studentCounter = 4;

const createStudent = async (req, res) => {
  console.log('📝 Creating student - Request received:', req.body);
  try {
    const {
      name, email, course, fees, phone, address, dateOfBirth,
      guardianName, guardianPhone
    } = req.body;

    // Try to use database first
    if (req.databaseConnected && Student) {
      console.log('💾 Creating student in database...');

      // Check if email already exists in database
      const existingStudent = await Student.findOne({ where: { email } });
      if (existingStudent) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Create new student in database
      const newStudent = await Student.create({
        name,
        email,
        course,
        fees,
        phone: phone || '',
        address: address || '',
        dateOfBirth: dateOfBirth || null,
        guardianName: guardianName || '',
        guardianPhone: guardianPhone || '',
        isActive: true
      });

      console.log('✅ Student created in database:', newStudent.id);
      return res.status(201).json(newStudent);
    }

    // Fallback to in-memory storage
    console.log('💾 Creating student in fallback storage...');

    // Check if email already exists in fallback data
    const existingStudent = fallbackStudents.find(s => s.email === email);
    if (existingStudent) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const newStudent = {
      id: Date.now().toString(),
      name,
      email,
      course,
      fees: fees || '0',
      enrollmentDate: new Date().toISOString().split('T')[0],
      isActive: true,
      phone: phone || '',
      address: address || '',
      dateOfBirth: dateOfBirth || '',
      guardianName: guardianName || '',
      guardianPhone: guardianPhone || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    fallbackStudents.push(newStudent);
    console.log('✅ Student created in fallback storage:', newStudent.id);
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Failed to create student' });
  }
};

const getAllStudents = async (req, res) => {
  try {
    // Try to use database first
    if (req.databaseConnected && Student) {
      console.log('📚 Fetching students from database...');
      const students = await Student.findAll({
        where: { isActive: true },
        order: [['createdAt', 'DESC']]
      });
      console.log(`✅ Found ${students.length} students in database`);
      res.json(students);
    } else {
      // Fallback to static data
      console.log('📚 Using fallback student data...');
      res.json(fallbackStudents.filter(s => s.isActive));
    }
  } catch (error) {
    console.error('❌ Error fetching students:', error);
    // Fallback to static data on error
    console.log('📚 Using fallback student data due to error...');
    res.json(fallbackStudents.filter(s => s.isActive));
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Try DB first if available
    if (req.databaseConnected && Student) {
      const student = await Student.findByPk(id);
      if (!student || student.isActive === false) {
        return res.status(404).json({ error: 'Student not found' });
      }
      return res.json(student);
    }

    const student = fallbackStudents.find(s => s.id === id && s.isActive);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Failed to fetch student' });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Try DB first
    if (req.databaseConnected && Student) {
      const student = await Student.findByPk(id);
      if (!student || student.isActive === false) {
        return res.status(404).json({ error: 'Student not found' });
      }

      if (updates.email && updates.email !== student.email) {
        const existing = await Student.findOne({ where: { email: updates.email } });
        if (existing && existing.id !== id) {
          return res.status(400).json({ error: 'Email already exists' });
        }
      }

      await student.update({
        name: updates.name ?? student.name,
        email: updates.email ?? student.email,
        course: updates.course ?? student.course,
        fees: updates.fees ?? student.fees,
        phone: updates.phone ?? student.phone,
        address: updates.address ?? student.address,
        dateOfBirth: updates.dateOfBirth ?? student.dateOfBirth,
        guardianName: updates.guardianName ?? student.guardianName,
        guardianPhone: updates.guardianPhone ?? student.guardianPhone
      });

      return res.json(student);
    }

    const studentIndex = fallbackStudents.findIndex(s => s.id === id && s.isActive);
    if (studentIndex === -1) {
      return res.status(404).json({ error: 'Student not found' });
    }

    if (updates.email && updates.email !== fallbackStudents[studentIndex].email) {
      const existingStudent = fallbackStudents.find(s => s.email === updates.email && s.id !== id);
      if (existingStudent) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    fallbackStudents[studentIndex] = {
      ...fallbackStudents[studentIndex],
      ...updates,
      updatedAt: new Date()
    };

    res.json(fallbackStudents[studentIndex]);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Failed to update student' });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Try DB first
    if (req.databaseConnected && Student) {
      const student = await Student.findByPk(id);
      if (!student || student.isActive === false) {
        return res.status(404).json({ error: 'Student not found' });
      }
      await student.update({ isActive: false });
      return res.json({ message: 'Student deleted successfully' });
    }

    const studentIndex = fallbackStudents.findIndex(s => s.id === id && s.isActive);
    if (studentIndex === -1) {
      return res.status(404).json({ error: 'Student not found' });
    }

    fallbackStudents[studentIndex].isActive = false;
    fallbackStudents[studentIndex].updatedAt = new Date();

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Failed to delete student' });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};