const express = require('express');
const router = express.Router();

// In-memory user database (replace with real database in production)
let users = [
  { id: 1, name: 'Admin User', email: 'admin@learnx.com', password: 'admin123', role: 'admin' }
];

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

// Auth routes
router.post('/signup', (req, res) => {
  const { name, email, password, role } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }

  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ 
      success: false, 
      message: 'User with this email already exists. Please use a different email or login with your existing account.' 
    });
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password, // In production, hash this password
    role: role || 'student',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: 'Account created successfully!',
    user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
  });
});

router.post('/login', (req, res) => {
  const { email, password, role } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    });
  }

  // Find user by email
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid email or password' 
    });
  }

  // Check password
  if (user.password !== password) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid email or password' 
    });
  }

  // Check role if specified
  if (role && user.role !== role) {
    return res.status(403).json({ 
      success: false, 
      message: `Access denied. This account is not registered as ${role}` 
    });
  }

  res.json({
    success: true,
    message: 'Login successful!',
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token: 'mock-jwt-token'
  });
});

// Students routes
router.get('/students', (req, res) => {
  res.json([]);
});

router.post('/students', (req, res) => {
  const { fullName, email, class: studentClass } = req.body;
  const newStudent = { id: Date.now(), fullName, email, class: studentClass };
  res.status(201).json(newStudent);
});

// Routines routes
router.get('/routines', (req, res) => {
  res.json([]);
});

router.post('/routines', (req, res) => {
  const { day, subject, time, class: routineClass } = req.body;
  const newRoutine = { id: Date.now(), day, subject, time, class: routineClass };
  res.status(201).json(newRoutine);
});

// Fees routes
router.get('/fees', (req, res) => {
  res.json([]);
});

router.post('/fees', (req, res) => {
  const { studentName, amount, status } = req.body;
  const newFee = { id: Date.now(), studentName, amount, status };
  res.status(201).json(newFee);
});

// Notifications routes
router.get('/notifications', (req, res) => {
  res.json([]);
});

router.post('/notifications', (req, res) => {
  const { title, message, date, priority } = req.body;
  const newNotification = { id: Date.now(), title, message, date, priority };
  res.status(201).json(newNotification);
});

// Learning Materials routes
router.get('/learning-materials', (req, res) => {
  res.json([]);
});

router.post('/learning-materials', (req, res) => {
  const { title, type, link } = req.body;
  const newMaterial = { id: Date.now(), title, type, link };
  res.status(201).json(newMaterial);
});

// Attendance routes
router.get('/attendance', (req, res) => {
  res.json([]);
});

router.post('/attendance', (req, res) => {
  const { student, date, status } = req.body;
  const newAttendance = { id: Date.now(), student, date, status };
  res.status(201).json(newAttendance);
});

// Reports routes
router.get('/reports', (req, res) => {
  res.json([]);
});

router.post('/reports', (req, res) => {
  const { title, type, date, status } = req.body;
  const newReport = { id: Date.now(), title, type, date, status };
  res.status(201).json(newReport);
});

module.exports = router;
