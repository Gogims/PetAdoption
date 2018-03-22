const db = require('../../sequelize/db');
const { GraphQLObjectType, GraphQLList } = require('graphql');
const { resolver, defaultListArgs, attributeFields } = require('graphql-sequelize');
//const userOutput = require('../outputs/userType');

const roleType = new GraphQLObjectType({
  name: 'Role',
  description: 'A role like admin',
  fields: Object.assign({}, attributeFields(db.role), {
    // user: {
    //   type: userOutput.type,
    //   resolve: resolver(db.role.associations.user)
    // }
  })
});

module.exports = {
  type: roleType,
  schema: {
    type: new GraphQLList(roleType),
    resolve: resolver(db.role),
    args: defaultListArgs(db.role)
  }
};