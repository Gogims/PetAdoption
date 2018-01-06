const Specie = require('../../sequelize/specie');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLInputObjectType } = require('graphql');

const SpecieInputType = new GraphQLInputObjectType({
    name: 'SpecieInput',
    description: 'Specie payload',
    fields: attributeFields(Specie, {
        allowNull: true
    })
});

module.exports = SpecieInputType;