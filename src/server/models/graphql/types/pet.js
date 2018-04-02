const db = require('../../sequelize/db');
const { GraphQLObjectType } = require('graphql');
const { attributeFields } = require('graphql-sequelize');

module.exports = new GraphQLObjectType({
    name: 'Pet',
    description: 'A pet like Brodie',
    fields: attributeFields(db.pet)
});