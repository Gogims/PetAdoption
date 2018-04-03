const db = require('../../../sequelize/db');
const { GraphQLList } = require('graphql');
const { resolver, defaultListArgs } = require('graphql-sequelize');
const frequencyType = require('../../types/frequency');

module.exports = {
  schema: {
    type: new GraphQLList(frequencyType),
    resolve: resolver(db.frequency, {
      list: true
    }),
    args: defaultListArgs(db.frequency)
  }
};