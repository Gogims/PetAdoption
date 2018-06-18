const db = require('../../../sequelize/db');
const { GraphQLList } = require('graphql');
const { resolver, defaultListArgs } = require('graphql-sequelize');
const breedType = require('../../types/breed');
const Auth = require('../../authentication');

module.exports = {
  schema: {
    type: new GraphQLList(breedType),
    resolve: Auth.hasRole("admin", resolver(db.breed)),
    args: defaultListArgs(db.breed)
  }
};