const express = require('express');
const studentRoute = require('./user/studentRoute');
const routineRoute = require('./routineRoute');
const learningMaterialRoute = require('./learningMaterialRoute');
const feeRoute = require('./feeRoute');
const notificationRoute = require('./notificationRoute');
const reportRoute = require('./reportRoute');
const attendanceRoute = require('./attendanceRoute');
const signupRoute = require('./signupRoute');
const loginRoute = require('./loginRoute');
// ...add other routes as you build them

const router = express.Router();

router.use('/students', studentRoute);
router.use('/routines', routineRoute);
router.use('/learning-materials', learningMaterialRoute);
router.use('/fees', feeRoute);
router.use('/notifications', notificationRoute);
router.use('/reports', reportRoute);
router.use('/attendance', attendanceRoute);
router.use('/', signupRoute);
router.use('/', loginRoute);
// ...add other routes as needed

module.exports = router;
