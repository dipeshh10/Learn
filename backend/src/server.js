require('dotenv').config();
const express = require('express');
const cors = require('cors');
const models = require('./models');


const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

console.log('🚀 LearnX Backend Server starting with persistent data...');

// Initialize database connection using models' Sequelize instance
let databaseConnected = false;
const initializeDatabase = async () => {
  try {
    console.log('🔄 Attempting database connection (server)...');
    await models.sequelize.authenticate();
    await models.sequelize.sync();
    databaseConnected = true;
    console.log('✅ Database connected and models synchronized');
  } catch (error) {
    databaseConnected = false;
    console.warn('⚠️ Database connection failed, running with fallback data:', error.message);
  }
};

initializeDatabase().catch(() => {
  console.log('📝 Server will continue with fallback data');
});

// Middleware to expose DB status to controllers
app.use((req, res, next) => {
  req.databaseConnected = databaseConnected;
  next();
});

// Main API routes
const apiRoutes = require('./route');
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    server: 'LearnX Backend',
    port: process.env.PORT || 5002
  });
});

let reports = [
  {
    id: '1',
    studentId: '1',
    teacherId: '1',
    title: 'Monthly Progress Report',
    content: 'Student showing excellent progress.',
    reportType: 'progress',
    createdAt: new Date()
  }
];

let fees = [
  {
    id: '1',
    studentId: '1',
    amount: 5000,
    dueDate: '2024-12-31',
    status: 'pending',
    description: 'Tuition fee for December',
    createdAt: new Date()
  }
];

let attendance = [
  {
    id: '1',
    studentId: '1',
    date: '2024-12-01',
    status: 'present',
    subject: 'Mathematics',
    createdAt: new Date()
  }
];

let learningMaterials = [
  {
    id: '1',
    title: 'Algebra Basics',
    subject: 'Mathematics',
    teacherId: '1',
    fileUrl: '/files/algebra-basics.pdf',
    description: 'Introduction to basic algebra concepts',
    createdAt: new Date()
  }
];

// Removed in-memory teachers seed; teacher data is served from the database via routes

let courses = [
  {
    id: '1',
    name: 'Mathematics 101',
    description: 'Basic mathematics course',
    teacherId: '1',
    teacherName: 'Prof. Johnson',
    duration: '3 months',
    credits: 3,
    createdAt: new Date()
  }
];

let users = [
  { id: '1', email: 'admin@learnx.com', password: 'admin123', role: 'admin', name: 'Admin User' },
  { id: '2', email: 'teacher@learnx.com', password: 'teacher123', role: 'teacher', name: 'Teacher User' },
  { id: '3', email: 'student@learnx.com', password: 'student123', role: 'student', name: 'Student User' },
  { id: '999', email: 'dummy@learnx.com', password: 'dummy123', role: 'admin', name: 'Dummy User' }
];

let idCounter = 100;

// Simple test routes without importing problematic controllers

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!', timestamp: new Date() });
});

// Authentication endpoints
app.post('/api/auth/signup', (req, res) => {
  try {
    console.log('Signup request received:', req.body);
    const { email, password, name, role = 'student' } = req.body;
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists' 
      });
    }
    
    // Create new user
    const newUser = {
      id: String(++idCounter),
      email,
      password,
      name,
      role,
      createdAt: new Date()
    };
    
    users.push(newUser);
    
    // Return user without password
    const { password: _, ...userResponse } = newUser;
    
    res.json({ 
      success: true, 
      message: 'User created successfully',
      user: userResponse
    });
    
    console.log('User created successfully:', userResponse);
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

app.post('/api/auth/signin', (req, res) => {
  try {
    console.log('Signin request received:', req.body);
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    // Return user without password
    const { password: _, ...userResponse } = user;
    
    res.json({ 
      success: true, 
      message: 'Login successful',
      user: userResponse
    });
    
    console.log('User signed in successfully:', userResponse);
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

app.post('/api/login', (req, res) => {
  console.log('🔑 Login request received:', req.body);
  const { email, password } = req.body;
  
  if (!email || !password) {
    console.log('❌ Missing email or password');
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }
  
  // Simple mock authentication
  const mockUsers = [
    { id: '1', email: 'admin@learnx.com', password: 'admin123', role: 'admin', name: 'Admin User' },
    { id: '2', email: 'teacher@learnx.com', password: 'teacher123', role: 'teacher', name: 'Teacher User' },
    { id: '3', email: 'student@learnx.com', password: 'student123', role: 'student', name: 'Student User' }
  ];
  
  console.log(`🔍 Looking for user with email: ${email}`);
  console.log('📋 Available users:', mockUsers.map(u => `${u.email} (${u.role})`));
  
  const user = mockUsers.find(u => u.email === email && u.password === password);
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    console.log(`✅ Login successful for: ${userWithoutPassword.email} (${userWithoutPassword.role})`);
    res.json({
      success: true,
      user: userWithoutPassword,
      token: `mock-token-${user.id}`,
      message: 'Login successful'
    });
  } else {
    console.log('❌ Login failed - Invalid credentials');
    console.log(`🔍 Attempted: ${email} / ${password}`);
    console.log('📋 Expected users:', mockUsers.map(u => `${u.email} / ${u.password}`));
    res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }
});

app.post('/api/register', (req, res) => {
  const { name, email, password, role } = req.body;
  
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    role: role || 'student',
    createdAt: new Date()
  };
  
  res.status(201).json({
    success: true,
    user: newUser,
    message: 'Registration successful'
  });
});

// Signup endpoint (alias for register)
app.post('/api/signup', (req, res) => {
  const { name, email, password, role } = req.body;
  
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    role: role || 'student',
    createdAt: new Date()
  };
  
  res.status(201).json({
    success: true,
    user: newUser,
    message: 'Signup successful'
  });
});

app.post('/api/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

app.get('/api/students', (req, res) => {
  res.json([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@student.com',
      class: '10th Grade',
      rollNumber: 'S001'
    },
    {
      id: '2',
      name: 'Alice Smith',
      email: 'alice@student.com',
      class: '10th Grade',
      rollNumber: 'S002'
    }
  ]);
});

const { Routine, Attendance, Report } = require('./models');

app.get('/api/routines', async (req, res) => {
  try {
    const routines = await Routine.findAll();
    res.json(routines);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch routines' });
  }
});

// Removed direct reports endpoint; use router/controller

// Removed direct fees endpoint; use router/controller

app.get('/api/attendance', async (req, res) => {
  try {
    const attendance = await Attendance.findAll();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
});

// Removed direct learning materials endpoint; use router/controller

// Removed direct teachers endpoint; use router/controller at /api/teachers

// Courses endpoint
// Removed direct courses endpoint; use router/controller

// Basic POST endpoints for testing
app.post('/api/students', (req, res) => {
  const newStudent = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date()
  };
  res.status(201).json(newStudent);
});

app.post('/api/routines', (req, res) => {
  const newRoutine = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date()
  };
  res.status(201).json(newRoutine);
});

app.post('/api/reports', (req, res) => {
  const newReport = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date()
  };
  res.status(201).json(newReport);
});

app.post('/api/teachers', async (req, res) => {
  try {
    const newTeacher = await models.Teacher.create(req.body);
    res.status(201).json(newTeacher);
  } catch (error) {
    console.error('Error creating teacher:', error);
    res.status(500).json({ error: 'Failed to create teacher' });
  }
});

app.post('/api/courses', (req, res) => {
  const newCourse = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date()
  };
  res.status(201).json(newCourse);
});

app.post('/api/learning-materials', (req, res) => {
  const newMaterial = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date()
  };
  res.status(201).json(newMaterial);
});

// PUT endpoints for updates
app.put('/api/students/:id', (req, res) => {
  const updatedStudent = {
    id: req.params.id,
    ...req.body,
    updatedAt: new Date()
  };
  res.json(updatedStudent);
});

app.put('/api/routines/:id', (req, res) => {
  const updatedRoutine = {
    id: req.params.id,
    ...req.body,
    updatedAt: new Date()
  };
  res.json(updatedRoutine);
});

// DELETE endpoints
app.delete('/api/students/:id', (req, res) => {
  res.status(204).send();
});

app.delete('/api/routines/:id', (req, res) => {
  res.status(204).send();
});

app.delete('/api/reports/:id', (req, res) => {
  res.status(204).send();
});


const { sequelize } = require('./models');
sequelize.sync().then(() => {
  // Seed realistic sample data if tables are empty
  const { Routine, Attendance, Report, User, Student } = require('./models');

  // Seed dummy user for foreign key
  User.findOrCreate({
    where: { id: '999' },
    defaults: {
      id: '999',
      email: 'dummy@learnx.com',
      password: 'dummy123',
      role: 'admin',
      name: 'Dummy User'
    }
  }).then(() => {
    // Seed students if table is empty
    Student.count().then(async (studentCount) => {
      if (studentCount === 0) {
        await Student.bulkCreate([
          {
            id: '1',
            name: 'John Doe',
            email: 'john@student.com',
            course: '10th Grade',
            fees: '5000',
            enrollmentDate: new Date('2024-01-01'),
            isActive: true
          },
          {
            id: '2',
            name: 'Alice Smith',
            email: 'alice@student.com',
            course: '10th Grade',
            fees: '5000',
            enrollmentDate: new Date('2024-01-01'),
            isActive: true
          }
        ]);
      }
      Promise.all([
        Routine.count(),
        Attendance.count(),
        Report.count()
      ]).then(async ([routineCount, attendanceCount, reportCount]) => {
        if (routineCount === 0) {
          await Routine.bulkCreate([
            {
              subject: 'Mathematics',
              className: '10th Grade',
              teacherName: 'Prof. Johnson',
              day: 'Monday',
              startTime: '09:00',
              endTime: '10:00',
              room: 'Room 101',
              time: '09:00-10:00',
              createdBy: '999'
            },
            {
              subject: 'English',
              className: '10th Grade',
              teacherName: 'Prof. Smith',
              day: 'Monday',
              startTime: '10:00',
              endTime: '11:00',
              room: 'Room 102',
              time: '10:00-11:00',
              createdBy: '999'
            }
          ]);
        }
        if (attendanceCount === 0) {
          await Attendance.bulkCreate([
            {
              studentId: '1',
              studentName: 'John Doe',
              class: '10th Grade',
              date: '2024-12-01',
              status: 'present',
              subject: 'Mathematics',
              markedBy: '999'
            },
            {
              studentId: '2',
              studentName: 'Alice Smith',
              class: '10th Grade',
              date: '2024-12-01',
              status: 'absent',
              subject: 'English',
              markedBy: '999'
            }
          ]);
        }
        if (reportCount === 0) {
          await Report.bulkCreate([
            {
              studentId: '1',
              studentName: 'John Doe',
              teacherId: '1',
              title: 'Monthly Progress Report',
              content: 'Student showing excellent progress.',
              reportType: 'progress',
              subject: 'Mathematics',
              grades: 'A',
              createdBy: '999'
            },
            {
              studentId: '2',
              studentName: 'Alice Smith',
              teacherId: '2',
              title: 'Attendance Report',
              content: 'Student was absent for English class.',
              reportType: 'attendance',
              subject: 'English',
              grades: 'B',
              createdBy: '999'
            }
          ]);
        }
        const PORT = process.env.PORT || 5002;
        app.listen(PORT, () => {
          console.log(`✅ Backend server running on port ${PORT}`);
          console.log(`🔗 API available at http://localhost:${PORT}/api`);
          console.log('📊 Running in fallback mode with sample data');
        });
      });
    });
  });
});
