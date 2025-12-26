const express = require('express');
const router = express.Router();

const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Update user role (ADMIN only)
router.put('/:username/role',authenticateToken,authorizeRole('admin'),userController.updateUserRole);

// Get all users (ADMIN only)
router.get('/',authenticateToken,authorizeRole('admin'),userController.getAllUsers);


module.exports = router;
