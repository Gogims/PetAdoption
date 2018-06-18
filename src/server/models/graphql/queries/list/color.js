const db = require('../../../sequelize/db');
const { GraphQLList } = require('graphql');
const { resolver, defaultListArgs } = require('graphql-sequelize');
const colorType = require('../../types/color');
const Auth = require('../../authentication');

module.exports = {
  schema: {
    type: new GraphQLList(colorType),
    resolve: Auth.hasRole("admin", resolver(db.color, {
      list: true
    })),
    args: defaultListArgs(db.color)
  }
};