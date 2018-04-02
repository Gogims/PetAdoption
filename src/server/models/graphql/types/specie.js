const db = require('../../sequelize/db');
const { GraphQLObjectType } = require('graphql');
const { attributeFields } = require('graphql-sequelize');

module.exports = new GraphQLObjectType({
    name: 'Specie',
    description: 'A specie like dog',
    fields: attributeFields(db.specie)
});