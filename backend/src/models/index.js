require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });
console.log('models/index.js loaded');
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');


const sequelize = new Sequelize(
  process.env.DB_NAME || 'LearnX',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'admin123',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false,
  }
);


const db = {};
const modelDefiners = [];

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    modelDefiners.push(require(path.join(__dirname, file)));
  });

modelDefiners.forEach(definer => {
  const model = definer(sequelize, DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log('Loaded models:', Object.keys(db));
module.exports = db;