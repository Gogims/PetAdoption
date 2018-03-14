const specieOutput = require('./outputs/specieType');
const breedOutput = require('./outputs/breedType');
const breedPetOutput = require('./outputs/breedPetType');
const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const fs = require('fs');
const path = require('path');
const helper = require('../../../helper');

let schemaList = new Object();
const outputPath = path.join(__dirname, 'outputs');

fs.readdirSync(outputPath)
.filter(file => file !== "deleted.js")
.forEach(file => {
  const output = require(path.join(outputPath, file));
  const propertyName = helper.pluralize(file.slice(0, -7));
  Object.assign(schemaList, {
      [propertyName]: output.schema
    });
});

let mutationList = new Object();
const mutationPath = path.join(__dirname, 'mutations');

fs.readdirSync(mutationPath)
.forEach(file => {
  const mutation = require(path.join(mutationPath, file));
  Object.assign(mutationList, mutation);
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: schemaList
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: mutationList
    })
});

module.exports = schema;