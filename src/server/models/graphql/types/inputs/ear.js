const db = require('../../../sequelize/db');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLInputObjectType, GraphQLString } = require('graphql');

let earFields = attributeFields(db.ear, {
    allowNull: true
});
delete earFields.earType;

earFields.ear = {
  type: GraphQLString
};

module.exports = new GraphQLInputObjectType({
    name: 'EarInput',
    description: 'Ear payload',
    fields: earFields
});