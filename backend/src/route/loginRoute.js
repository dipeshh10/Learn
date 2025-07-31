const express = require('express');
const { login } = require('../controller/loginController');

const router = express.Router();

// Public login route
router.post('/login', login);

module.exports = router;
