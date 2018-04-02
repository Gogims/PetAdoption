const db = require('../../sequelize/db');
const { GraphQLList } = require('graphql');
const { resolver, defaultListArgs } = require('graphql-sequelize');
const reactionType = require('../types/reaction');

module.exports = {
  type: reactionType,
  schema: {
    type: new GraphQLList(reactionType),
    resolve: resolver(db.reaction, {
      list: true
    }),
    args: defaultListArgs(db.reaction)
  }
};