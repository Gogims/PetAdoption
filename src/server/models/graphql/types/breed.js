const db = require('../../sequelize/db');
const specieType = require('./specie');
const { GraphQLObjectType } = require('graphql');
const { resolver, attributeFields } = require('graphql-sequelize');

module.exports = new GraphQLObjectType({
    name: 'Breed',
    description: 'A breed like dog',
    fields: Object.assign({}, attributeFields(db.breed), {
        specie: {
            type: specieType,
            resolve: resolver(db.breed.associations.specie)
        }
    })
});