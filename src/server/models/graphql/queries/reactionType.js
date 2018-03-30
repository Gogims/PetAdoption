const db = require('../../sequelize/db');
const { GraphQLObjectType, GraphQLList } = require('graphql');
const { resolver, defaultListArgs, attributeFields } = require('graphql-sequelize');

const reactionType = new GraphQLObjectType({
  name: 'Reaction',
  description: 'A reaction like dog',
  fields: attributeFields(db.reaction)
});

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