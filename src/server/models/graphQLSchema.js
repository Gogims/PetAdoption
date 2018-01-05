const graphQL = require('graphql');
const specie = require('./specie');

const schema = new graphQL.GraphQLSchema({
    query: specie.graphql
});

module.exports = schema;