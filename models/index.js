const Sequelize = require('sequelize');
const config = require('../config/config');

const DB = config.development;

const sequelize = new Sequelize(DB.database, DB.username, DB.password, {
    host: DB.host,
    dialect: DB.dialect
  }); 

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);

module.exports = db;
