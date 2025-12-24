const appModel = require('../models/appModel');
const logActivity = require('../utils/logActivity');

// GET /apps
const getAllApps = async (req, res) => {
  try {
    const apps = await appModel.getAllApps();
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /apps/:id
const getAppById = async (req, res) => {
  try {
    const app = await appModel.getAppById(req.params.id);
    if (!app) return res.status(404).json({ error: 'App not found' });
    res.json(app);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /apps
const createApp = async (req, res) => {
  try {
    const newApp = req.body;
    const insertId = await appModel.createApp(newApp);

    if (req.user) await logActivity(req.user.userId, 'Created App', JSON.stringify(newApp));

    res.status(201).json({ message: 'App created', id: insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /apps/:id
const updateApp = async (req, res) => {
  try {
    const app = req.body;
    await appModel.updateApp(req.params.id, app);

    if (req.user) await logActivity(req.user.userId, 'Updated App', JSON.stringify(app));

    res.json({ message: 'App updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /apps/:id
const deleteApp = async (req, res) => {
  try {
    await appModel.deleteApp(req.params.id);

    if (req.user) await logActivity(req.user.userId, 'Deleted App', req.params.id);

    res.json({ message: 'App deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllApps,
  getAppById,
  createApp,
  updateApp,
  deleteApp
};
