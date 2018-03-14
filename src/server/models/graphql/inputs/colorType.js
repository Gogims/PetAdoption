const db = require('../../sequelize/db');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLInputObjectType } = require('graphql');

const ColorInputType = new GraphQLInputObjectType({
    name: 'ColorInput',
    description: 'Color payload',
    fields: attributeFields(db.color, {
        allowNull: true
    })
});

module.exports = ColorInputType;