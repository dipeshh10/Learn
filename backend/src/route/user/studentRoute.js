const express = require('express');
const authenticateToken = require('../../middleware/authenticateToken');
const authorizeRole = require('../../middleware/authorizeRole');
const { getAllStudents } = require('../../controller/user/studentController');

const router = express.Router();

// Admin: Get all students
router.get('/', authenticateToken, authorizeRole('admin'), getAllStudents);

module.exports = router;
