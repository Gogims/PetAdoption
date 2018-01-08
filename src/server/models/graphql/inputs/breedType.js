const db = require('../../sequelize/db');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLInputObjectType } = require('graphql');

const BreedInputType = new GraphQLInputObjectType({
    name: 'SpecieInput',
    description: 'Specie payload',
    fields: attributeFields(db.breed, {
        allowNull: true
    })
});

module.exports = SpecieInputType;