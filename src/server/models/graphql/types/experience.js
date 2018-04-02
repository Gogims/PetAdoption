const db = require('../../sequelize/db');
const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');
const { attributeFields } = require('graphql-sequelize');

let experienceFields = attributeFields(db.experience);
delete experienceFields.ownerExperience;

experienceFields.experience = {
  type: new GraphQLNonNull(GraphQLString)
};

module.exports = new GraphQLObjectType({
  name: 'Experience',
  description: 'Amount of experience',
  fields: experienceFields
});