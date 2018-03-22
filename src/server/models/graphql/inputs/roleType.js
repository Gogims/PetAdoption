const db = require('../../sequelize/db');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLInputObjectType } = require('graphql');

const RoleInputType = new GraphQLInputObjectType({
    name: 'RoleInput',
    description: 'Role payload',
    fields: attributeFields(db.role, {
        allowNull: true
    })
});

module.exports = RoleInputType;