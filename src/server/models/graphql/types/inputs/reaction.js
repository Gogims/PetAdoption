const db = require('../../../sequelize/db');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLInputObjectType } = require('graphql');

module.exports = new GraphQLInputObjectType({
    name: 'ReactionInput',
    description: 'Reaction payload',
    fields: attributeFields(db.reaction, {
        allowNull: true
    })
});