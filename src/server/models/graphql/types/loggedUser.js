const { GraphQLObjectType, GraphQLString } = require('graphql');
const UserType = require('./user');
const { resolver } = require('graphql-sequelize');
const db = require('../../sequelize/db');

module.exports = new GraphQLObjectType({
    name: 'LoggedUser',
    description: 'User object and the token',
    fields: () => ({
        user: {
            type: UserType
        },
        token: {
            type: GraphQLString
        }
    })
});