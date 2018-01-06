const Sequelize = require('sequelize');
const db = require ('./db');
const Breeds = require('./breed');

const Species = db.define('specie', {
  specie: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
});

Species.hasMany(Breeds, {
    foreignKey: { allowNull: false }
});


module.exports = Species;