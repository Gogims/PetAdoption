const db = require('../../../sequelize/db');
const { GraphQLList } = require('graphql');
const { resolver, defaultListArgs } = require('graphql-sequelize');
const roleType = require('../../types/role');

module.exports = {
  schema: {
    type: new GraphQLList(roleType),
    resolve: resolver(db.role),
    args: defaultListArgs(db.role)
  }
};