const db = require('../../../sequelize/db');
const { GraphQLList } = require('graphql');
const { resolver, defaultListArgs } = require('graphql-sequelize');
const breedType = require('../../types/breed');

module.exports = {
  schema: {
    type: new GraphQLList(breedType),
    resolve: resolver(db.breed),
    args: defaultListArgs(db.breed)
  }
};