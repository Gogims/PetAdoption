const db = require('../../sequelize/db');
const { resolver, defaultArgs } = require('graphql-sequelize');
const userType = require('../types/user');

module.exports = {
  schema: {
    type: userType,
    resolve: resolver(db.user),
    args: defaultArgs(db.user)
  }
};