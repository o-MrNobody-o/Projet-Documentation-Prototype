const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logActivity = require('../utils/logActivity');
require('dotenv').config();

// POST /login
const login = async (req, res) => {
  const { email, password } = req.body;

  // DEBUG: log the incoming password for test
  console.log('Request password:', password);

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    // DEBUG: log the hash from the database for test
    console.log('DB hash:', user.password_hash);

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Log activity
    await logActivity(user.id, 'User logged in');

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { login };
