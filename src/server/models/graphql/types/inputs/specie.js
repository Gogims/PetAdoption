const db = require('../../../sequelize/db');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLInputObjectType } = require('graphql');

module.exports = new GraphQLInputObjectType({
    name: 'SpecieInput',
    description: 'Specie payload',
    fields: attributeFields(db.specie, {
        allowNull: true
    })
});