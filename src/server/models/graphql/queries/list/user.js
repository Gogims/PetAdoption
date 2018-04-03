const db = require('../../../sequelize/db');
const { GraphQLList } = require('graphql');
const { resolver, defaultListArgs } = require('graphql-sequelize');
const userType = require('../../types/user');

module.exports = {
  schema: {
    type: new GraphQLList(userType),
    resolve: resolver(db.user, {
      list: true
    }),
    args: defaultListArgs(db.user)
  }
};