const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

const deletedType = new GraphQLObjectType({
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

module.exports = deletedType;