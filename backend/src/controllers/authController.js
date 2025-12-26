const db = require('../config/db');
const jwt = require('jsonwebtoken');
const logActivity = require('../utils/logActivity');
const ldap = require('ldapjs');
require('dotenv').config();

// Helper: wrap LDAP bind in a Promise for async/await
const bindLdap = (dn, password, client) => {
  return new Promise((resolve, reject) => {
    client.bind(dn, password, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// POST /login
const login = async (req, res) => {
  const { username, password } = req.body;

  const client = ldap.createClient({
    url: "ldap://localhost:389" // LOCAL TEST
    // For company AD: ldap://ad.company.local or ldaps://ad.company.local:636
  });

  const dn = `uid=${username},dc=test,dc=local`; // LOCAL TEST
  // For company AD: DOMAIN\username or full CN from IT

  try {
    // Authenticate user in LDAP
    await bindLdap(dn, password, client);

    // Check if user exists in your app DB
    let [rows] = await db.query(
      'SELECT r.role_name, ur.role_id FROM user_roles ur JOIN roles r ON ur.role_id = r.role_id WHERE ur.username = ?',
      [username]
    );

    let role;
    if (rows.length === 0) {
      // User not in DB → insert with default role
      role = 'viewer';
      await db.query(
        'INSERT INTO user_roles (username, role_id) SELECT ?, role_id FROM roles WHERE role_name = ?',
        [username, role]
      );
    } else {
      // User exists → get role from DB
      role = rows[0].role_name;
    }

    // Generate JWT
    const token = jwt.sign(
      { username, role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Log activity
    await logActivity(username, 'User logged in');

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err.message);
    if (err.code === 'LDAP_INVALID_CREDENTIALS' || err.message.includes('Invalid credentials')) {
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      res.status(500).json({ error: err.message });
    }
  } finally {
    client.unbind();
  }
};

module.exports = { login };
