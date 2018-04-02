const db = require('../../sequelize/db');
const { GraphQLObjectType, GraphQLList } = require('graphql');
const { attributeFields, resolver } = require('graphql-sequelize');
const userType = require('./user');

module.exports = new GraphQLObjectType({
    name: 'Role',
    description: 'A role like admin',
    fields: () => (Object.assign({}, attributeFields(db.role), {
      user: {
        type: new GraphQLList(userType),
        //resolve: resolver(db.role.associations.user)
      }
    }))
  });