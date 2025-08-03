// Course controller with database integration and fallback data
const db = require('../models');
const Course = db && db.Course ? db.Course : null;

let courses = [
  {
    id: '1',
    name: 'Advanced Mathematics',
    code: 'MATH301',
    description: 'Advanced mathematical concepts including calculus and linear algebra',
    credits: 4,
    duration: '1 semester',
    teacherId: '1',
    teacherName: 'Prof. Johnson',
    department: 'Science',
    level: 'Advanced',
    maxStudents: 30,
    currentStudents: 25,
    fee: 1500.00,
    startDate: '2024-09-01',
    endDate: '2024-12-15',
    isActive: true,
    syllabus: 'Calculus, Linear Algebra, Differential Equations',
    prerequisites: 'Basic Mathematics, Algebra',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'English Literature',
    code: 'ENG201',
    description: 'Study of classic and modern English literature',
    credits: 3,
    duration: '1 semester',
    teacherId: '2',
    teacherName: 'Prof. Smith',
    department: 'Arts',
    level: 'Intermediate',
    maxStudents: 25,
    currentStudents: 20,
    fee: 1200.00,
    startDate: '2024-09-01',
    endDate: '2024-12-15',
    isActive: true,
    syllabus: 'Shakespeare, Modern Poetry, Essay Writing',
    prerequisites: 'Basic English',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Physics Fundamentals',
    code: 'PHY101',
    description: 'Introduction to basic physics concepts',
    credits: 4,
    duration: '1 semester',
    teacherId: '3',
    teacherName: 'Dr. Wilson',
    department: 'Science',
    level: 'Beginner',
    maxStudents: 35,
    currentStudents: 30,
    fee: 1400.00,
    startDate: '2024-09-01',
    endDate: '2024-12-15',
    isActive: true,
    syllabus: 'Mechanics, Thermodynamics, Waves',
    prerequisites: 'Basic Mathematics',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

let courseCounter = 4;

const createCourse = async (req, res) => {
  try {
    const {
      name, code, description, credits, duration, teacherId, teacherName,
      department, level, maxStudents, fee, startDate, endDate, syllabus, prerequisites
    } = req.body;

    if (req.databaseConnected && Course) {
      const exists = await Course.findOne({ where: { code } });
      if (exists) {
        return res.status(400).json({ error: 'Course code already exists' });
      }

      const created = await Course.create({
        name,
        code,
        description: description || '',
        credits: typeof credits === 'number' ? credits : (credits ? Number(credits) : 3),
        duration: duration || '1 semester',
        teacherId: teacherId || null,
        teacherName: teacherName || '',
        department: department || '',
        level: level || 'Beginner',
        maxStudents: typeof maxStudents === 'number' ? maxStudents : (maxStudents ? Number(maxStudents) : 30),
        currentStudents: 0,
        fee: fee ?? null,
        startDate: startDate || null,
        endDate: endDate || null,
        isActive: true,
        syllabus: syllabus || '',
        prerequisites: prerequisites || ''
      });

      return res.status(201).json(created);
    }

    // Fallback
    const existingCourse = courses.find(c => c.code === code);
    if (existingCourse) {
      return res.status(400).json({ error: 'Course code already exists' });
    }

    const newCourse = {
      id: (courseCounter++).toString(),
      name,
      code,
      description: description || '',
      credits: credits || 3,
      duration: duration || '1 semester',
      teacherId: teacherId || null,
      teacherName: teacherName || '',
      department: department || '',
      level: level || 'Beginner',
      maxStudents: maxStudents || 30,
      currentStudents: 0,
      fee: fee || null,
      startDate: startDate || null,
      endDate: endDate || null,
      isActive: true,
      syllabus: syllabus || '',
      prerequisites: prerequisites || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    courses.push(newCourse);
    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
};

const getAllCourses = async (req, res) => {
  try {
    if (req.databaseConnected && Course) {
      const list = await Course.findAll({ where: { isActive: true }, order: [['createdAt', 'DESC']] });
      return res.json(list);
    }
    res.json(courses.filter(c => c.isActive));
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.databaseConnected && Course) {
      const course = await Course.findByPk(id);
      if (!course || course.isActive === false) {
        return res.status(404).json({ error: 'Course not found' });
      }
      return res.json(course);
    }

    const course = courses.find(c => c.id === id && c.isActive);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.databaseConnected && Course) {
      const course = await Course.findByPk(id);
      if (!course || course.isActive === false) {
        return res.status(404).json({ error: 'Course not found' });
      }

      if (updates.code && updates.code !== course.code) {
        const existing = await Course.findOne({ where: { code: updates.code } });
        if (existing && existing.id !== id) {
          return res.status(400).json({ error: 'Course code already exists' });
        }
      }

      await course.update({
        name: updates.name ?? course.name,
        code: updates.code ?? course.code,
        description: updates.description ?? course.description,
        credits: typeof updates.credits === 'number' ? updates.credits : (updates.credits ? Number(updates.credits) : course.credits),
        duration: updates.duration ?? course.duration,
        teacherId: updates.teacherId ?? course.teacherId,
        teacherName: updates.teacherName ?? course.teacherName,
        department: updates.department ?? course.department,
        level: updates.level ?? course.level,
        maxStudents: typeof updates.maxStudents === 'number' ? updates.maxStudents : (updates.maxStudents ? Number(updates.maxStudents) : course.maxStudents),
        currentStudents: typeof updates.currentStudents === 'number' ? updates.currentStudents : (updates.currentStudents ? Number(updates.currentStudents) : course.currentStudents),
        fee: updates.fee ?? course.fee,
        startDate: updates.startDate ?? course.startDate,
        endDate: updates.endDate ?? course.endDate,
        syllabus: updates.syllabus ?? course.syllabus,
        prerequisites: updates.prerequisites ?? course.prerequisites
      });

      return res.json(course);
    }

    const courseIndex = courses.findIndex(c => c.id === id && c.isActive);
    if (courseIndex === -1) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (updates.code && updates.code !== courses[courseIndex].code) {
      const existingCourse = courses.find(c => c.code === updates.code && c.id !== id);
      if (existingCourse) {
        return res.status(400).json({ error: 'Course code already exists' });
      }
    }

    courses[courseIndex] = {
      ...courses[courseIndex],
      ...updates,
      updatedAt: new Date()
    };

    res.json(courses[courseIndex]);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Failed to update course' });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.databaseConnected && Course) {
      const course = await Course.findByPk(id);
      if (!course || course.isActive === false) {
        return res.status(404).json({ error: 'Course not found' });
      }

      await course.update({ isActive: false });
      return res.json({ message: 'Course deleted successfully' });
    }

    const courseIndex = courses.findIndex(c => c.id === id && c.isActive);
    if (courseIndex === -1) {
      return res.status(404).json({ error: 'Course not found' });
    }

    courses[courseIndex].isActive = false;
    courses[courseIndex].updatedAt = new Date();

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Failed to delete course' });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};