const Sequelize = require('sequelize');
const db = require ('./db');

const Reactions = db.define('reaction', {
  reaction: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
});

module.exports = Reactions;