const db = require('../../sequelize/db');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLInputObjectType } = require('graphql');

const ExperienceInputType = new GraphQLInputObjectType({
    name: 'ExperienceInput',
    description: 'Experience payload',
    fields: attributeFields(db.experience, {
        allowNull: true
    })
});

module.exports = ExperienceInputType;