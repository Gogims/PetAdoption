const Sequelize = require('sequelize');
const db = require ('./db');

const Pets = db.define('pet', {
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    birthDay: {
        type: Sequelize.DATEONLY
    },
    birthEstimate: {
        type: Sequelize.BOOLEAN
    },
    statusId: {
        type: Sequelize.INTEGER
    },
    currentSize: {
        type: Sequelize.INTEGER
    },
    potentialSize: {
        type: Sequelize.INTEGER
    },
    fenceRequired: {
        type: Sequelize.BOOLEAN
    },
    houseTrained: {
        type: Sequelize.BOOLEAN
    },
    isObedient: {
        type: Sequelize.BOOLEAN
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender:{
        type: Sequelize.STRING(1),
        allowNull: false
    },
    hasSpecialNeeds: {
        type: Sequelize.BOOLEAN
    },
    specialNeeds: {
        type: Sequelize.STRING
    },
    aditionalDescription: {
        type: Sequelize.STRING
    }
});

module.exports = Pets;