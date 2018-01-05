const graphQL = require('graphql');
const specie = require('./specie');

const schema = new graphQL.GraphQLSchema({
    query: new graphQL.GraphQLObjectType({
        name: 'RootQueryType',
        fields:{
            species: {
                type: specie.graphQL.type,
                args: specie.graphQL.args,
                resolve: specie.graphQL.resolve
            }
        }
    })
});

module.exports = schema;