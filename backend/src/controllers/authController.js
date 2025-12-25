const db = require('../config/db');
const jwt = require('jsonwebtoken');
const logActivity = require('../utils/logActivity');
const ldap = require('ldapjs');
require('dotenv').config();

// POST /login
const login = async (req, res) => {
  const { username, password } = req.body; // use username instead of email

  // LDAP client
  
  const client = ldap.createClient({
    url: "ldap://localhost:389" // LOCAL TEST
    // COMPANY AD: change to ldap://ad.company.local or ldaps://ad.company.local:636
  });

  const dn = `uid=${username},dc=test,dc=local`; // LOCAL TEST
  // COMPANY AD: DOMAIN\username or full CN from IT

  client.bind(dn, password, async (err) => {
    if (err) return res.status(401).json({ error: 'Invalid credentials' });

    try {
      // Fetch role from app DB
      const [rows] = await db.query(
        'SELECT r.role_name FROM user_roles ur JOIN roles r ON ur.role_id = r.role_id WHERE ur.username = ?',
        [username]
      );

      let role = 'viewer'; // default role if not assigned
      if (rows.length > 0) role = rows[0].role_name;

      // Create JWT
      const token = jwt.sign(
        { userId: username, role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      // Log activity
      await logActivity(username, 'User logged in');

      res.json({ token });
    } catch (dbErr) {
      console.error('DB error:', dbErr);
      res.status(500).json({ error: dbErr.message });
    }
  });
};

module.exports = { login };
