const pcAppModel = require('../models/pcAppModel');
const logActivity = require('../utils/logActivity');

const getAppsByPc = async (req, res) => {
  try {
    const apps = await pcAppModel.getAppsByPc(req.params.pcId);
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addAppToPc = async (req, res) => {
  try {
    const { pcId, appId } = req.body;
    await pcAppModel.addAppToPc(pcId, appId);

    if (req.user) await logActivity(req.user.userId, 'Installed App on PC', `${pcId}-${appId}`);

    res.json({ message: 'App installed on PC' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeAppFromPc = async (req, res) => {
  try {
    const { pcId, appId } = req.body;
    await pcAppModel.removeAppFromPc(pcId, appId);

    if (req.user) await logActivity(req.user.userId, 'Removed App from PC', `${pcId}-${appId}`);

    res.json({ message: 'App removed from PC' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAppsByPc,
  addAppToPc,
  removeAppFromPc
};
