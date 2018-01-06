const Sequelize = require('sequelize');
const db = require ('./db');

const Photos = db.define('photo', {
  path: {
    type: Sequelize.STRING
  }
});

// TODO: add animalId FK

module.exports = Status;