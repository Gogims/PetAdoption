const db = require('../../sequelize/db');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLInputObjectType } = require('graphql');

const ReactionInputType = new GraphQLInputObjectType({
    name: 'ReactionInput',
    description: 'Reaction payload',
    fields: attributeFields(db.reaction, {
        allowNull: true
    })
});

module.exports = ReactionInputType;