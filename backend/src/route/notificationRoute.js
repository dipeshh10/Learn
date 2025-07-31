const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');
const {
  createNotification,
  getAllNotifications,
  getUserNotifications,
  markNotificationRead,
  deleteNotification,
} = require('../controller/notificationController');

const router = express.Router();

// Admin: Create notification
router.post('/', authenticateToken, authorizeRole('admin'), createNotification);
// Admin: Get all notifications
router.get('/all', authenticateToken, authorizeRole('admin'), getAllNotifications);
// User: Get own notifications
router.get('/', authenticateToken, getUserNotifications);
// User: Mark notification as read
router.patch('/:id/read', authenticateToken, markNotificationRead);
// Admin: Delete notification
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteNotification);

module.exports = router;
