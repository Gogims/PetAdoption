const Sequelize = require('sequelize');
const db = require ('./db');

const GuestBooks = db.define('guestbook', {
  name: {
    type: Sequelize.STRING(50)
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(50)
  },
  approved: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = GuestBooks;