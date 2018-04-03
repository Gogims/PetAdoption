const db = require('../../sequelize/db');
const { GraphQLObjectType, GraphQLList } = require('graphql');
const { resolver, attributeFields } = require('graphql-sequelize');

module.exports = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => {
    const roleType = require('./role');

    return Object.assign({}, attributeFields(db.user), {
      roles: {
        type: new GraphQLList(roleType),
        resolve: (user, args, context, info) => {
          return user.getRoles();
        }
      }
    })
  }
});