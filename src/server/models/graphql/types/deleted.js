const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'Deleted',
    description: 'Result of a deleted call',
    fields: {
        status: {
            type: GraphQLInt
        },
        message: {
            type: GraphQLString
        }
    }
});