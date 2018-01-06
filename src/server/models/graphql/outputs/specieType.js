const Specie = require('../../sequelize/specie');
const { GraphQLObjectType } = require('graphql');
const { attributeFields } = require('graphql-sequelize');

const specieType = new GraphQLObjectType({
  name: 'Specie',
  description: 'A specie like dog',
  fields: attributeFields(Specie)
});

module.exports = specieType;