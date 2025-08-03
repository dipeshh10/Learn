const express = require('express');
const studentRoute = require('./user/studentRoute');
const teacherRoute = require('./teacherRoute');
const courseRoute = require('./courseRoute');
// const routineRoute = require('./routineRoute'); // Temporarily disabled
const learningMaterialRoute = require('./learningMaterialRoute');
const feeRoute = require('./feeRoute');
const notificationRoute = require('./notificationRoute');
// const reportRoute = require('./reportRoute'); // Temporarily disabled to fix backend crash
const attendanceRoute = require('./attendanceRoute');
const signupRoute = require('./signupRoute');
const loginRoute = require('./loginRoute');
// ...add other routes as you build them

const router = express.Router();

console.log('Registering students route...');
router.use('/students', studentRoute);
console.log('Registering teachers route...');
router.use('/teachers', teacherRoute);
console.log('Teachers route registered successfully!');
console.log('Registering courses route...');
router.use('/courses', courseRoute);
router.use('/routines', require('./routineRoute'));
router.use('/learning-materials', learningMaterialRoute);
router.use('/fees', feeRoute);
router.use('/notifications', notificationRoute);
router.use('/reports', require('./reportRoute'));
router.use('/attendance', attendanceRoute);
router.use('/', signupRoute);
// router.use('/', loginRoute); // Temporarily disabled - using fallback login

// Temporary working login route
router.post('/login', (req, res) => {
  const { email, password, role } = req.body;

  console.log('🔑 Login attempt:', { email, password: password ? '[PROVIDED]' : '[MISSING]', role });

  if (!email || !password) {
    console.log('❌ Missing email or password');
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  // Available users
  const users = [
    { id: 1, name: 'Admin User', email: 'admin@learnx.com', password: 'admin123', role: 'admin' },
    { id: 2, name: 'John Teacher', email: 'teacher@learnx.com', password: 'teacher123', role: 'teacher' },
    { id: 3, name: 'Jane Student', email: 'student@learnx.com', password: 'student123', role: 'student' },
    { id: 4, name: 'Admin', email: 'admin@admin.com', password: 'admin', role: 'admin' },
    { id: 5, name: 'Teacher', email: 'teacher@teacher.com', password: 'teacher', role: 'teacher' },
    { id: 6, name: 'Student', email: 'student@student.com', password: 'student', role: 'student' }
  ];

  // Find user by email
  const user = users.find(u => u.email === email);

  if (!user) {
    console.log('❌ User not found with email:', email);
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  // Check password
  if (user.password !== password) {
    console.log('❌ Password mismatch for user:', email);
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  // Check role if specified
  if (role && user.role !== role) {
    console.log('❌ Role mismatch. Expected:', role, 'User role:', user.role);
    return res.status(403).json({
      success: false,
      message: `Access denied. This account is not registered as ${role}`
    });
  }

  console.log('✅ Login successful for user:', user.email, 'Role:', user.role);

  res.json({
    success: true,
    message: 'Login successful!',
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token: 'mock-jwt-token'
  });
});

// ...add other routes as needed

module.exports = router;
