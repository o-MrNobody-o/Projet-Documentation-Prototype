const pcModel = require('../models/pcModel');
const logActivity = require('../utils/logActivity'); // optional activity logging

// GET /pcs
const getAllPcs = async (req, res) => {
  try {
    const pcs = await pcModel.getAllPcs();
    res.json(pcs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /pcs/:id
const getPcById = async (req, res) => {
  try {
    const pc = await pcModel.getPcById(req.params.id);
    if (!pc) return res.status(404).json({ error: 'PC not found' });
    res.json(pc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /pcs
const createPc = async (req, res) => {
  try {
    const newPc = req.body;
    const insertId = await pcModel.createPc(newPc);

    // log activity (optional)
    if (req.user) {
      await logActivity(req.user.userId, 'Created PC', JSON.stringify(newPc));
    }

    res.status(201).json({ message: 'PC created', id: insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /pcs/:id
const updatePc = async (req, res) => {
  try {
    const pc = req.body;
    await pcModel.updatePc(req.params.id, pc);

    // log activity (optional)
    if (req.user) {
      await logActivity(req.user.userId, 'Updated PC', JSON.stringify(pc));
    }

    res.json({ message: 'PC updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /pcs/:id
const deletePc = async (req, res) => {
  try {
    await pcModel.deletePc(req.params.id);

    // log activity (optional)
    if (req.user) {
      await logActivity(req.user.userId, 'Deleted PC', req.params.id);
    }

    res.json({ message: 'PC deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllPcs,
  getPcById,
  createPc,
  updatePc,
  deletePc
};
