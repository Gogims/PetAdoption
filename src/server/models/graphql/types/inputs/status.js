const db = require('../../../sequelize/db');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLInputObjectType } = require('graphql');

module.exports = new GraphQLInputObjectType({
    name: 'StatusInput',
    description: 'Status payload',
    fields: attributeFields(db.status, {
        allowNull: true
    })
});