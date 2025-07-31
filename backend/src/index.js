require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Main API routes (students, etc.)
const apiRoutes = require('./route');
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5002;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;