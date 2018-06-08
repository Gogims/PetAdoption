const db = require('../../../sequelize/db');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLInputObjectType, GraphQLList } = require('graphql');

module.exports = new GraphQLInputObjectType({
    name: 'UserInput',
    description: 'User payload',
    fields: () => {
        const roleInputType = require('./role');

        return Object.assign({},
            attributeFields(db.user, {
                allowNull: true
            }),
            {
                roles: {
                    type: new GraphQLList(roleInputType)
                }
            });
    }
});