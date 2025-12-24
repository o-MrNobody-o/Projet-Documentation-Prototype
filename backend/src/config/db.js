const mysql = require('mysql2/promise');
require('dotenv').config();

// Creating a connection pool ( to be updated later )
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export 
module.exports = {
  query: (sql, params) => pool.execute(sql, params)
};
