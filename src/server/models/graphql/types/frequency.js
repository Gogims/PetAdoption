const db = require('../../sequelize/db');
const { GraphQLObjectType } = require('graphql');
const { attributeFields } = require('graphql-sequelize');

module.exports = new GraphQLObjectType({
    name: 'Frequency',
    description: 'Description of frequency',
    fields: attributeFields(db.frequency)
});