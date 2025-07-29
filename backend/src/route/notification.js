const express = require('express');
const router = express.Router();
const { Notification } = require('../models');

function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Forbidden: Admins only' });
}

// Get all notifications (all roles)
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notifications', error: err.message });
  }
});

// Add notification (admin only)
router.post('/', isAdmin, async (req, res) => {
  try {
    const { title, message, date, priority } = req.body;
    const notification = await Notification.create({ title, message, date, priority });
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add notification', error: err.message });
  }
});

// Edit notification (admin only)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const { title, message, date, priority } = req.body;
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    await notification.update({ title, message, date, priority });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update notification', error: err.message });
  }
});

// Delete notification (admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    await notification.destroy();
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete notification', error: err.message });
  }
});

module.exports = router; 