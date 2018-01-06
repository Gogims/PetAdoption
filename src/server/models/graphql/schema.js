const Specie = require('../sequelize/specie');
const specieOutput = require('./outputs/specieType');
const mutations = require('./mutations/root');
const { GraphQLObjectType, GraphQLList, GraphQLSchema } = require('graphql');
const { resolver, defaultListArgs } = require('graphql-sequelize');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields:{
            species: {
                type: new GraphQLList(specieOutput),
                resolve: resolver(Specie, {
                    list: true
                }),
                args: defaultListArgs(Specie)
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: mutations
    })
});

module.exports = schema;