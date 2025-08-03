const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
    
    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized successfully');
    
    return sequelize;
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  }
};

module.exports = { sequelize, db };



