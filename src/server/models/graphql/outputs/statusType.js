const db = require('../../sequelize/db');
const { GraphQLObjectType, GraphQLList } = require('graphql');
const { resolver, defaultListArgs, attributeFields } = require('graphql-sequelize');

const statusType = new GraphQLObjectType({
  name: 'Status',
  description: 'A status like dog',
  fields: attributeFields(db.status)
});

module.exports = {
  type: statusType,
  schema: {
    type: new GraphQLList(statusType),
    resolve: resolver(db.status, {
      list: true
    }),
    args: defaultListArgs(db.status)
  }
};