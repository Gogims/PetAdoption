const Sequelize = require('sequelize');
const config = require('../../config/config')[process.env.NODE_ENV];

const db = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,

  pool: {
    max: 5,
    min: 0,
    acquire: 10000,
    idle: 10000
  }
});

module.exports = db;

