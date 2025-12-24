const db = require('../config/db');

/**
 * Logs a user action to the database
 * @param {number} userId - ID of the user performing the action
 * @param {string} action - Description of the action (e.g., 'Created PC')
 * @param {string} details - Optional extra info (e.g., JSON string)
 */
const logActivity = async (userId, action, details = null) => {
  try {
    await db.query(
      `INSERT INTO activity_log (user_id, action, details)
       VALUES (?, ?, ?)`,
      [userId, action, details]
    );
  } catch (err) {
    console.error('Failed to log activity:', err.message);
  }
};

module.exports = logActivity;
