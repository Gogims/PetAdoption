const Sequelize = require('sequelize');
const db = require ('./db');

const Experiences = db.define('experience', {
    ownerExperience: {
        type: Sequelize.STRING(50),
        allowNull: false
    }
});

module.exports = Experiences;