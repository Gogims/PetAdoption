const db = require('../../../sequelize/db');
const { attributeFields } = require('graphql-sequelize');
const { GraphQLInputObjectType, GraphQLString } = require('graphql');

let experienceFields = attributeFields(db.experience, {
    allowNull: true
});
delete experienceFields.ownerExperience;

experienceFields.experience = {
  type: GraphQLString
};

module.exports = new GraphQLInputObjectType({
    name: 'ExperienceInput',
    description: 'Experience payload',
    fields: experienceFields
});