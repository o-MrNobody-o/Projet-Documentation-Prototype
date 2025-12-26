const db = require('../config/db');

const getAllUsersWithRoles = async () => {
  const [rows] = await db.query(
    `SELECT ur.username, r.role_name AS role
     FROM user_roles ur
     JOIN roles r ON ur.role_id = r.role_id`
  );
  return rows;
};

const getUserByUsername = async (username) => {
  const [rows] = await db.query(
    'SELECT * FROM user_roles WHERE username = ?',
    [username]
  );
  return rows[0];
};

const updateUserRole = async (username, roleId) => {
  const [result] = await db.query(
    'UPDATE user_roles SET role_id = ? WHERE username = ?',
    [roleId, username]
  );
  return result.affectedRows;
};

module.exports = {
  getUserByUsername,
  updateUserRole,
  getAllUsersWithRoles
};
