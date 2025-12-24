const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pcAppRoutes = require('./routes/pcAppRoutes');
const pcRoutes = require('./routes/pcRoutes');
const appRoutes = require('./routes/appRoutes');     
const authRoutes = require('./routes/authRoutes');   

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // parse JSON body

// Routes
app.use('/api/pcs', pcRoutes);
app.use('/api/apps', appRoutes);
app.use('/api/pc-app', pcAppRoutes);       
app.use('/api/auth', authRoutes);     

// Default route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

module.exports = app;
