const express = require('express');
const router = express.Router();
const pcController = require('../controllers/pcController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

// Public route: list all PCs
 //router.get('/', authenticateToken, authorizeRole('admin'),pcController.getAllPcs);
router.get('/', pcController.getAllPcs);

// Get a single PC
router.get('/:id', authenticateToken,authorizeRole('viewer','admin','manager'), pcController.getPcById);

// Create a new PC (operator or admin)
router.post('/', authenticateToken, authorizeRole('manager', 'admin'), pcController.createPc);

// Update a PC (operator or admin)
router.put('/:id', authenticateToken, authorizeRole('manager', 'admin'), pcController.updatePc);

// Delete a PC (admin only)
router.delete('/:id', authenticateToken, authorizeRole('admin'), pcController.deletePc);

module.exports = router;
