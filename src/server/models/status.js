const Sequelize = require('sequelize');
const db = require ('./db');

const Status = db.define('status', {
  status: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
});

module.exports = Status;