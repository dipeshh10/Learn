require('dotenv').config();
const express = require('express');
const cors = require('cors');
const models = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`📝 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('📦 Request body:', req.body);
  }
  next();
});

// Initialize database connection
let databaseConnected = false;

// Initialize database (use the same Sequelize instance as models)
const initializeDatabase = async () => {
  try {
    console.log('🔄 Attempting database connection (models)...');
    await models.sequelize.authenticate();
    await models.sequelize.sync();
    databaseConnected = true;
    console.log('✅ Database connected successfully!');
  } catch (error) {
    console.warn('⚠️ Database connection failed:', error.message);
    console.log('🔄 Running in fallback mode with sample data...');
    databaseConnected = false;
  }
};

// Initialize database on startup (non-blocking)
initializeDatabase().catch(() => {
  console.log('📝 Server will continue with fallback data');
});

// Middleware to check database status
app.use((req, res, next) => {
  req.databaseConnected = databaseConnected;
  next();
});

// Test route
app.get('/test', (req, res) => {
  console.log('Test route hit!');
  res.json({ message: 'Server is working!' });
});

// Direct test routes for debugging
app.get('/api/test-teachers', (req, res) => {
  console.log('Direct teachers test route hit!');
  res.json([
    { id: '1', name: 'Prof. Johnson', email: 'johnson@learnx.com', subject: 'Mathematics' },
    { id: '2', name: 'Prof. Smith', email: 'smith@learnx.com', subject: 'English' }
  ]);
});

app.get('/api/test-courses', (req, res) => {
  console.log('Direct courses test route hit!');
  res.json([
    { id: '1', name: 'Mathematics 101', code: 'MATH101', teacherName: 'Prof. Johnson' },
    { id: '2', name: 'English Literature', code: 'ENG201', teacherName: 'Prof. Smith' }
  ]);
});

console.log('Registering API routes...');
// Main API routes (students, etc.)
const apiRoutes = require('./route');
app.use('/api', apiRoutes);
console.log('API routes registered!');

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    database: req.databaseConnected ? 'Connected' : 'Disconnected - using fallback'
  });
});

const PORT = process.env.PORT || 5002;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Database status: ${databaseConnected ? 'Connected' : 'Fallback mode'}`);
  });
}

module.exports = app;