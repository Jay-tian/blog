const process = require('process');
const path = require('path');
const rootPath = process.cwd();
const dbPath = path.join(rootPath, 'config/db.json');
const Sequelize = require('sequelize');
const parameters = require('../loader/ConfigLoader.js');

let dbConfig = require(dbPath);
dbConfig = dbConfig[parameters.env];

const db = new Sequelize(
  dbConfig.database, 
  dbConfig.username, 
  dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false
  }
);

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
module.exports = db;