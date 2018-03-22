const db = require('../../sequelize/db');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLInputObjectType } = require('graphql');

const UserInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    description: 'User payload',
    fields: attributeFields(db.user, {
        allowNull: true
    })
});

module.exports = UserInputType;