const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

router.get('/', authenticateToken,appController.getAllApps);
router.get('/:id', authenticateToken,appController.getAppById);
router.post('/', authenticateToken,appController.createApp);
router.put('/:id', authenticateToken,appController.updateApp);
router.delete('/:id', authenticateToken,appController.deleteApp);

module.exports = router;
