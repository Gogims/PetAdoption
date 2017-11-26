const Sequelize = require('sequelize');
const db = require ('./db');

const Tails = db.define('tail', {
    tailType: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
});

module.exports = Tails;