const db = require('../config/db');

// Get all apps installed on a PC
const getAppsByPc = async (pcId) => {
  const [rows] = await db.query(
    `SELECT a.* 
     FROM app a
     JOIN pc_app pa ON a.id = pa.app_id
     WHERE pa.pc_id = ?`,
    [pcId]
  );
  return rows;
};

// Get all PCs that have a given app
const getPcsByApp = async (appId) => {
  const [rows] = await db.query(
    `SELECT p.*
     FROM pc p
     JOIN pc_app pa ON p.id = pa.pc_id
     WHERE pa.app_id = ?`,
    [appId]
  );
  return rows;
};

// Install an app on a PC
const addAppToPc = async (pcId, appId) => {
  await db.query(
    'INSERT INTO pc_app (pc_id, app_id) VALUES (?, ?)',
    [pcId, appId]
  );
};

// Remove an app from a PC
const removeAppFromPc = async (pcId, appId) => {
  await db.query(
    'DELETE FROM pc_app WHERE pc_id = ? AND app_id = ?',
    [pcId, appId]
  );
};

module.exports = {
  getAppsByPc,
  getPcsByApp,
  addAppToPc,
  removeAppFromPc
};
