const db = require('../../sequelize/db');
const { GraphQLObjectType, GraphQLList } = require('graphql');
const { resolver, defaultListArgs, attributeFields } = require('graphql-sequelize');

const specieType = new GraphQLObjectType({
  name: 'Specie',
  description: 'A specie like dog',
  fields: attributeFields(db.specie)
});

module.exports = {
  type: specieType,
  schema: {
    type: new GraphQLList(specieType),
    resolve: resolver(db.specie, {
      list: true
    }),
    args: defaultListArgs(db.specie)
  }
};