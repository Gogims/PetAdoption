const db = require('../../../sequelize/db');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLInputObjectType } = require('graphql');

module.exports = new GraphQLInputObjectType({
    name: 'BreedInput',
    description: 'Breed payload',
    fields: attributeFields(db.breed, {
        allowNull: true
    })
});