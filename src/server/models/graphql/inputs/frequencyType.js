const db = require('../../sequelize/db');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLInputObjectType } = require('graphql');

const FrequencyInputType = new GraphQLInputObjectType({
    name: 'FrequencyInput',
    description: 'Frequency payload',
    fields: attributeFields(db.frequency, {
        allowNull: true
    })
});

module.exports = FrequencyInputType;