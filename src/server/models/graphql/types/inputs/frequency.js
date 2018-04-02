const db = require('../../../sequelize/db');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLInputObjectType } = require('graphql');


module.exports = new GraphQLInputObjectType({
    name: 'FrequencyInput',
    description: 'Frequency payload',
    fields: attributeFields(db.frequency, {
        allowNull: true
    })
});