const pool = require('../database/db');

// Create Notification
async function createNotification(req, res) {
  const { user_id, message } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO notifications (user_id, message) VALUES ($1, $2) RETURNING *',
      [user_id, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get All Notifications (admin only)
async function getAllNotifications(req, res) {
  try {
    const result = await pool.query('SELECT * FROM notifications');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get Notifications for current user
async function getUserNotifications(req, res) {
  try {
    const result = await pool.query('SELECT * FROM notifications WHERE user_id = $1', [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Mark notification as read
async function markNotificationRead(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('UPDATE notifications SET read = TRUE WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete Notification
async function deleteNotification(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM notifications WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.sendStatus(404);
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createNotification,
  getAllNotifications,
  getUserNotifications,
  markNotificationRead,
  deleteNotification,
};
