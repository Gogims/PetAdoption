const db = require('../../../sequelize/db');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLInputObjectType } = require('graphql');

module.exports = new GraphQLInputObjectType({
    name: 'ColorInput',
    description: 'Color payload',
    fields: attributeFields(db.color, {
        allowNull: true
    })
});