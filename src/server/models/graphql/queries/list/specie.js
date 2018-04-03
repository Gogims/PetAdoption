const db = require('../../../sequelize/db');
const { GraphQLList } = require('graphql');
const { resolver, defaultListArgs } = require('graphql-sequelize');
const specieType = require('../../types/specie');

module.exports = {
  schema: {
    type: new GraphQLList(specieType),
    resolve: resolver(db.specie, {
      list: true
    }),
    args: defaultListArgs(db.specie)
  }
};