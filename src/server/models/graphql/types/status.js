const db = require('../../sequelize/db');
const { GraphQLObjectType } = require('graphql');
const { attributeFields } = require('graphql-sequelize');

module.exports = new GraphQLObjectType({
    name: 'Status',
    description: 'A status like available or adopted',
    fields: attributeFields(db.status)
});