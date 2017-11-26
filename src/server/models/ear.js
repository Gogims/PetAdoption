const Sequelize = require('sequelize');
const db = require ('./db');

const Ears = db.define('ear', {
    earType: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
});

module.exports = Ears;