const db = require('../../sequelize/db');
const { GraphQLObjectType } = require('graphql');
const { attributeFields } = require('graphql-sequelize');

module.exports = new GraphQLObjectType({
    name: 'Reaction',
    description: 'A reaction like dog',
    fields: attributeFields(db.reaction)
});