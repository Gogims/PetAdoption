const Specie = require('../../sequelize/specie');
const { GraphQLObjectType, GraphQLList } = require('graphql');
const { resolver, defaultListArgs, attributeFields } = require('graphql-sequelize');

const specieType = new GraphQLObjectType({
  name: 'Specie',
  description: 'A specie like dog',
  fields: attributeFields(Specie)
});

module.exports = {
  type: specieType,
  schema: {
    type: new GraphQLList(specieType),
    resolve: resolver(Specie, {
      list: true
    }),
    args: defaultListArgs(Specie)
  }
};