// Teacher controller with database integration and fallback data
const db = require('../models');
const Teacher = db && db.Teacher ? db.Teacher : null;

let teachers = [
  {
    id: '1',
    name: 'Prof. Johnson',
    email: 'johnson@learnx.com',
    phone: '123-456-7890',
    subject: 'Mathematics',
    department: 'Science',
    qualification: 'PhD in Mathematics',
    experience: 10,
    joiningDate: '2020-01-15',
    salary: 75000,
    isActive: true,
    address: '123 University Ave',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Prof. Smith',
    email: 'smith@learnx.com',
    phone: '098-765-4321',
    subject: 'English',
    department: 'Arts',
    qualification: 'MA in English Literature',
    experience: 8,
    joiningDate: '2021-03-20',
    salary: 65000,
    isActive: true,
    address: '456 College St',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Dr. Wilson',
    email: 'wilson@learnx.com',
    phone: '555-123-4567',
    subject: 'Physics',
    department: 'Science',
    qualification: 'PhD in Physics',
    experience: 15,
    joiningDate: '2018-08-10',
    salary: 85000,
    isActive: true,
    address: '789 Science Blvd',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

let teacherCounter = 4;

const createTeacher = async (req, res) => {
  try {
    const { name, email, phone, subject, department, qualification, experience, salary, address, profileImage } = req.body;

    // Prefer database when connected and model is available
    if (req.databaseConnected && Teacher) {
      // Check for existing email
      const existing = await Teacher.findOne({ where: { email } });
      if (existing) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const created = await Teacher.create({
        name,
        email,
        phone: phone || '',
        subject,
        department: department || '',
        qualification: qualification || '',
        experience: typeof experience === 'number' ? experience : (experience ? Number(experience) : 0),
        salary: salary ?? null,
        address: address || '',
        profileImage: profileImage || null,
        isActive: true
      });

      return res.status(201).json(created);
    }

    // Fallback to in-memory storage
    const existingTeacher = teachers.find(t => t.email === email);
    if (existingTeacher) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const newTeacher = {
      id: (teacherCounter++).toString(),
      name,
      email,
      phone,
      subject,
      department,
      qualification: qualification || '',
      experience: experience || 0,
      joiningDate: new Date().toISOString().split('T')[0],
      salary: salary || null,
      isActive: true,
      address: address || '',
      profileImage: profileImage || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    teachers.push(newTeacher);
    res.status(201).json(newTeacher);
  } catch (error) {
    console.error('Error creating teacher:', error);
    res.status(500).json({ error: 'Failed to create teacher' });
  }
};

const getAllTeachers = async (req, res) => {
  try {
    if (req.databaseConnected && Teacher) {
      const list = await Teacher.findAll({
        where: { isActive: true },
        order: [['createdAt', 'DESC']]
      });
      return res.json(list);
    }

    res.json(teachers.filter(t => t.isActive));
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
};

const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.databaseConnected && Teacher) {
      const teacher = await Teacher.findByPk(id);
      if (!teacher || teacher.isActive === false) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
      return res.json(teacher);
    }

    const teacher = teachers.find(t => t.id === id && t.isActive);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    console.error('Error fetching teacher:', error);
    res.status(500).json({ error: 'Failed to fetch teacher' });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.databaseConnected && Teacher) {
      const teacher = await Teacher.findByPk(id);
      if (!teacher || teacher.isActive === false) {
        return res.status(404).json({ error: 'Teacher not found' });
      }

      if (updates.email && updates.email !== teacher.email) {
        const existing = await Teacher.findOne({ where: { email: updates.email } });
        if (existing && existing.id !== id) {
          return res.status(400).json({ error: 'Email already exists' });
        }
      }

      await teacher.update({
        name: updates.name ?? teacher.name,
        email: updates.email ?? teacher.email,
        phone: updates.phone ?? teacher.phone,
        subject: updates.subject ?? teacher.subject,
        department: updates.department ?? teacher.department,
        qualification: updates.qualification ?? teacher.qualification,
        experience: typeof updates.experience === 'number' ? updates.experience : (updates.experience ? Number(updates.experience) : teacher.experience),
        salary: updates.salary ?? teacher.salary,
        address: updates.address ?? teacher.address,
        profileImage: updates.profileImage ?? teacher.profileImage
      });

      return res.json(teacher);
    }

    const teacherIndex = teachers.findIndex(t => t.id === id && t.isActive);
    if (teacherIndex === -1) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    if (updates.email && updates.email !== teachers[teacherIndex].email) {
      const existingTeacher = teachers.find(t => t.email === updates.email && t.id !== id);
      if (existingTeacher) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    teachers[teacherIndex] = {
      ...teachers[teacherIndex],
      ...updates,
      updatedAt: new Date()
    };

    res.json(teachers[teacherIndex]);
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).json({ error: 'Failed to update teacher' });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.databaseConnected && Teacher) {
      const teacher = await Teacher.findByPk(id);
      if (!teacher || teacher.isActive === false) {
        return res.status(404).json({ error: 'Teacher not found' });
      }

      await teacher.update({ isActive: false });
      return res.json({ message: 'Teacher deleted successfully' });
    }

    const teacherIndex = teachers.findIndex(t => t.id === id && t.isActive);
    if (teacherIndex === -1) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    teachers[teacherIndex].isActive = false;
    teachers[teacherIndex].updatedAt = new Date();

    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).json({ error: 'Failed to delete teacher' });
  }
};

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher
};
