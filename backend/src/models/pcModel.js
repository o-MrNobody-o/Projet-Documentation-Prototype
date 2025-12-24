const db = require('../config/db');

const getAllPcs = async () => {
  const [rows] = await db.query('SELECT * FROM pc');
  return rows;
};

const getPcById = async (id) => {
  const [rows] = await db.query('SELECT * FROM pc WHERE id = ?', [id]);
  return rows[0];
};

const createPc = async (pc) => {
  const { id, location, group_name, park, status } = pc;
  const [result] = await db.query(
    'INSERT INTO pc (id, location, group_name, park, status) VALUES (?, ?, ?, ?, ?)',
    [id, location, group_name, park, status || 'Online']
  );
  return result.insertId;
};

const updatePc = async (id, pc) => {
  const { location, group_name, park, status } = pc;
  await db.query(
    'UPDATE pc SET location = ?, group_name = ?, park = ?, status = ? WHERE id = ?',
    [location, group_name, park, status, id]
  );
};

const deletePc = async (id) => {
  await db.query('DELETE FROM pc WHERE id = ?', [id]);
};

module.exports = {
  getAllPcs,
  getPcById,
  createPc,
  updatePc,
  deletePc
};
