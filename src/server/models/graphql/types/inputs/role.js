const db = require('../../../sequelize/db');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLInputObjectType } = require('graphql');

module.exports = new GraphQLInputObjectType({
    name: 'RoleInput',
    description: 'Role payload',
    fields: attributeFields(db.role, {
        allowNull: true
    })
});