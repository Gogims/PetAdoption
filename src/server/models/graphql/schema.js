const specieOutput = require('./outputs/specieType');
const breedOutput = require('./outputs/breedType');
const breedPetOutput = require('./outputs/breedPetType');
const mutations = require('./mutations/root');
const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields:{
            species: specieOutput.schema,
            breeds: breedOutput.schema,
            breedsPets: breedPetOutput.schema
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: mutations
    })
});

module.exports = schema;