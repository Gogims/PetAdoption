const Sequelize = require('sequelize');
const db = require ('./db');

const Frequencies = db.define('frequency', {
    frequency: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
});

module.exports = Frequencies;