const db = require('../../sequelize/db');
const { resolver, defaultArgs } = require('graphql-sequelize');
const userType = require('../types/user');
const Auth = require('../authentication');

module.exports = {
  schema: {
    type: userType,
    resolve: Auth.hasRole("admin", resolver(db.user)),
    args: defaultArgs(db.user)
  }
};