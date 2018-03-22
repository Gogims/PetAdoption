const db = require('../../sequelize/db');
const { GraphQLObjectType, GraphQLList } = require('graphql');
const { resolver, defaultListArgs, attributeFields } = require('graphql-sequelize');

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: attributeFields(db.user)
});

module.exports = {
  type: userType,
  schema: {
    type: new GraphQLList(userType),
    resolve: resolver(db.user, {
      list: true
    }),
    args: defaultListArgs(db.user)
  }
};