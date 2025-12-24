const db = require('../config/db');

const getAllApps = async () => {
  const [rows] = await db.query('SELECT * FROM app');
  return rows;
};

const getAppById = async (id) => {
  const [rows] = await db.query('SELECT * FROM app WHERE id = ?', [id]);
  return rows[0];
};

const createApp = async (app) => {
  const { name, version, server_install_path } = app;
  const [result] = await db.query(
    'INSERT INTO app (name, version, server_install_path) VALUES (?, ?, ?)',
    [name, version, server_install_path]
  );
  return result.insertId;
};

const updateApp = async (id, app) => {
  const { name, version, server_install_path } = app;
  await db.query(
    'UPDATE app SET name = ?, version = ?, server_install_path = ? WHERE id = ?',
    [name, version, server_install_path, id]
  );
};

const deleteApp = async (id) => {
  await db.query('DELETE FROM app WHERE id = ?', [id]);
};

module.exports = {
  getAllApps,
  getAppById,
  createApp,
  updateApp,
  deleteApp
};
