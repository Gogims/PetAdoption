const Sequelize = require('sequelize');
const db = require ('./db');
const Breeds = require('./breed');
const attributeFields = require('graphql-sequelize').attributeFields;
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

let test= new Object();
Object.assign(test, attributeFields(Species));

let specieType = new GraphQLObjectType({
  name: 'Specie',
  description: 'A specie like dog',
  fields: test
});


module.exports = {
  sequelize: Species,
  graphql: specieType
};