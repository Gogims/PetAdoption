const specieOutput = require('./outputs/specieType');
const breedOutput = require('./outputs/breedType');
const breedPetOutput = require('./outputs/breedPetType');
const mutations = require('./mutations/root');
const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const fs = require('fs');
const path = require('path');

let schemaList = new Object();
const outputPath = path.join(__dirname, 'outputs');

fs.readdirSync(outputPath)
.filter(file => file !== "deleted.js")
.forEach(file => {
  const output = require(path.join(outputPath, file));
  const propertyName = file.slice(0, -7) + "s";
  Object.assign(schemaList, {
      [propertyName]: output.schema
    });
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: schemaList
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: mutations
    })
});

module.exports = schema;