const db = require('../../sequelize/db');
const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');
const { attributeFields } = require('graphql-sequelize');

let tailFields = attributeFields(db.tail);
delete tailFields.tailType;

tailFields.tail = {
  type: new GraphQLNonNull(GraphQLString)
};

module.exports = new GraphQLObjectType({
  name: 'Tail',
  description: 'Type of tail',
  fields: tailFields
});