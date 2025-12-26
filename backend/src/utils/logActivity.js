const db = require('../config/db');

/**
 * Logs a user action to the database
 * @param {string} username - LDAP username of the user performing the action
 * @param {string} action - Description of the action (e.g., 'Created PC')
 * @param {string} details - Optional extra info (e.g., JSON string)
 */
const logActivity = async (username, action, details = null) => {
  try {
    const [result] = await db.query(
      `INSERT INTO activity_log (username, action, details)
       VALUES (?, ?, ?)`,
      [username, action, details]
    );
    console.log(`Activity logged for ${username}: ${action}`);
  } catch (err) {
    console.error('Failed to log activity:', err.message);
  }
};

module.exports = logActivity;
