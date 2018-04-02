const db = require('../../sequelize/db');
const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');
const { attributeFields } = require('graphql-sequelize');

let earFields = attributeFields(db.ear);
delete earFields.earType;

earFields.ear = {
    type: new GraphQLNonNull(GraphQLString)
};

module.exports = new GraphQLObjectType({
    name: 'Ear',
    description: 'Type of ear',
    fields: earFields
});