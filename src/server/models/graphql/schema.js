const Specie = require('../sequelize/specie');
const specieOutput = require('./outputs/specieType');
const mutations = require('./mutations/root');
const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields:{
            species: specieOutput.schema
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: mutations
    })
});

module.exports = schema;