const express = require('express');
const router = express.Router();
const pcAppController = require('../controllers/pcAppController');
// const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

// For now, no auth to test authenticateToken,


// Get all apps installed on a PC
router.get('/:pcId/apps', pcAppController.getAppsByPc);

// Install an app on a PC
router.post('/install', pcAppController.addAppToPc);

// Remove an app from a PC
router.post('/remove', pcAppController.removeAppFromPc);

module.exports = router;
