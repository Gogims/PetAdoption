const Sequelize = require('sequelize');
const db = require ('./db');

const Colors = db.define('color', {
    color: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
});

module.exports = Colors;