const Sequelize = require('sequelize');
const db = require ('./db');

const Breeds = db.define('breed', {
  breed: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
});

module.exports = Breeds;