require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, User, Student } = require('./models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authenticateToken = require('./middleware/authenticateToken');
 
const app = express();
app.use(cors());
app.use(express.json());
 
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
 
// User routes
const userRoutes = require('./routes/user');
app.use('/api', userRoutes);
 
// Student CRUD routes (protected)
const studentRoutes = require('./routes/student');
app.use('/api/students', authenticateToken, studentRoutes);
 
// Routine CRUD routes (protected)
const routineRoutes = require('./routes/routine');
app.use('/api/routines', authenticateToken, routineRoutes);
 
// Learning Material CRUD routes (protected)
const learningMaterialRoutes = require('./routes/learningMaterial');
app.use('/api/learning-materials', authenticateToken, learningMaterialRoutes);
 
// Fee CRUD routes (protected)
const feeRoutes = require('./routes/fee');
app.use('/api/fees', authenticateToken, feeRoutes);
 
// Notification CRUD routes (protected)
const notificationRoutes = require('./routes/notification');
app.use('/api/notifications', authenticateToken, notificationRoutes);
 
// Report CRUD routes (protected)
const reportRoutes = require('./routes/report');
app.use('/api/reports', authenticateToken, reportRoutes);
 
// Attendance CRUD routes (protected)
const attendanceRoutes = require('./routes/attendance');
app.use('/api/attendance', authenticateToken, attendanceRoutes);
 
const PORT = process.env.PORT || 5001;
 
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async () => {
    await sequelize.sync(); // No force: true, so data persists
    console.log(`Server running on port ${PORT}`);
  });
}
 
module.exports = app;