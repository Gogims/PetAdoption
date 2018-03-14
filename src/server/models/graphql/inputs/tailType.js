const db = require('../../sequelize/db');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLInputObjectType, GraphQLString } = require('graphql');

let tailFields = attributeFields(db.tail, {
    allowNull: true
});
delete tailFields.tailType;

tailFields.tail = {
  type: GraphQLString
};

const TailInputType = new GraphQLInputObjectType({
    name: 'TailInput',
    description: 'Tail payload',
    fields: tailFields
});

module.exports = TailInputType;