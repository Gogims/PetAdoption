const specieOutput = require('./outputs/specieType');
const breedOutput = require('./outputs/breedType');
const mutations = require('./mutations/root');
const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields:{
            species: specieOutput.schema,
            breeds: breedOutput.schema
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: mutations
    })
});

module.exports = schema;