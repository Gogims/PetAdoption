const db = require('../../sequelize/db');
const { resolver, defaultArgs } = require('graphql-sequelize');
const userType = require('../types/user');
const authenticate = require('../authentication');

module.exports = {
  schema: {
    type: userType,
    resolve: authenticate(resolver(db.user)),
    args: defaultArgs(db.user)
  }
};