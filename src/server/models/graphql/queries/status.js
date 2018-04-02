const db = require('../../sequelize/db');
const { GraphQLList } = require('graphql');
const { resolver, defaultListArgs } = require('graphql-sequelize');
const statusType = require('../types/status');

module.exports = {
  type: statusType,
  schema: {
    type: new GraphQLList(statusType),
    resolve: resolver(db.status, {
      list: true
    }),
    args: defaultListArgs(db.status)
  }
};