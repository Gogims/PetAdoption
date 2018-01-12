const db = require('../../sequelize/db');
const { GraphQLObjectType, GraphQLList } = require('graphql');
const { resolver, defaultListArgs, attributeFields } = require('graphql-sequelize');
const specieOutput = require('../outputs/specieType');

const breedType = new GraphQLObjectType({
  name: 'Breed',
  description: 'A breed like dog',
  fields: Object.assign({}, attributeFields(db.breed), {
    specie: {
      type: specieOutput.type,
      resolve: resolver(db.breed.associations.specie)
    }
  })
});

module.exports = {
  type: breedType,
  schema: {
    type: new GraphQLList(breedType),
    resolve: resolver(db.breed),
    args: defaultListArgs(db.breed)
  }
};