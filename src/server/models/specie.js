const Sequelize = require('sequelize');
const db = require ('./db');
const Breeds = require('./breed');
const attributeFields = require('graphql-sequelize').attributeFields;
const resolver = require('graphql-sequelize').resolver;
const defaultListArgs = require('graphql-sequelize').defaultListArgs;
const GraphQLObjectType = require('graphql').GraphQLObjectType;

const Species = db.define('specie', {
  specie: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
});

Species.hasMany(Breeds, {
    foreignKey: { allowNull: false }
});

const specieType = new GraphQLObjectType({
  name: 'Specie',
  description: 'A specie like dog',
  fields: attributeFields(Species)
});

module.exports = {
  sequelize: Species,
  graphQL: {
    type: specieType,
    resolve: resolver(Species),
    args: defaultListArgs(Species)}
};