const db = require('../config/db');

const getRoleByName = async (roleName) => {
  const [rows] = await db.query(
    'SELECT role_id FROM roles WHERE role_name = ?',
    [roleName]
  );
  return rows[0];
};

module.exports = {
  getRoleByName
};
