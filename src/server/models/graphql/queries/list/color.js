const db = require('../../../sequelize/db');
const { GraphQLList } = require('graphql');
const { resolver, defaultListArgs } = require('graphql-sequelize');
const colorType = require('../../types/color');

module.exports = {
  schema: {
    type: new GraphQLList(colorType),
    resolve: resolver(db.color, {
      list: true
    }),
    args: defaultListArgs(db.color)
  }
};