const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/profile', authenticateToken, userController.profile);

module.exports = router; 