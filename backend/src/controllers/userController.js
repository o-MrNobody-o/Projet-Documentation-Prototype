const userModel = require('../models/userModel');
const roleModel = require('../models/roleModel');
const logActivity = require('../utils/logActivity');

// PUT /api/users/:username/role
const updateUserRole = async (req, res) => {
  const { username } = req.params;
  const { role } = req.body; // expected: admin | manager | viewer

  try {
    // Validate role value
    const allowedRoles = ['admin', 'manager', 'viewer'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Get role from roles table
    const roleRecord = await roleModel.getRoleByName(role);
    if (!roleRecord) {
      return res.status(404).json({ message: 'Role not found' });
    }
    const roleId = roleRecord.role_id;

    // Get user by username
    const user = await userModel.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent admin from changing their own role
    if (req.user.username === username) {
      return res.status(400).json({ message: "You cannot change your own role" });
    }

    // Update role
    await userModel.updateUserRole(username, roleId);

    // Log admin activity
    await logActivity(req.user.username, `Changed role of ${username} to ${role}`);

    res.json({ message: 'User role updated successfully' });

  } catch (error) {
    console.error('Update role error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsersWithRoles();
    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  updateUserRole,
  getAllUsers
};

