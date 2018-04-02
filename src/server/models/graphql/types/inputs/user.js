const db = require('../../../sequelize/db');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLInputObjectType } = require('graphql');

module.exports = new GraphQLInputObjectType({
    name: 'UserInput',
    description: 'User payload',
    fields: attributeFields(db.user, {
        allowNull: true
    })
});