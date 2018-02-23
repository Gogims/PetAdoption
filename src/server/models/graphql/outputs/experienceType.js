const db = require('../../sequelize/db');
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLString } = require('graphql');
const { resolver, defaultListArgs, attributeFields } = require('graphql-sequelize');
const helper = require('../../../../helper');

let experienceFields = attributeFields(db.experience);
delete experienceFields.ownerExperience;

experienceFields.experience = {
  type: new GraphQLNonNull(GraphQLString)
};

const experienceType = new GraphQLObjectType({
  name: 'Experience',
  description: 'Amount of experience',
  fields: experienceFields
});

module.exports = {
  type: experienceType,
  schema: {
    type: new GraphQLList(experienceType),
    resolve: resolver(db.experience, {
      list: true,
      before: (findOptions, args, context) => {
        let newArgs = new Object(args);

        if (!helper.isEmpty(newArgs.where) && !helper.isEmpty(newArgs.where.experience)) {
          newArgs.where.ownerExperience = newArgs.where.experience;
          delete newArgs.where.experience;
        }

        let newOptions = new Object(findOptions);
        newOptions.where = newArgs.where;
        return newOptions;
      },
      after: (result, args, context) => {
        const newResult = result.map(experience => {
          experience.experience = experience.ownerExperience;
          // Tried the delete operator, but property still there
          experience.ownerExperience = undefined;
          return experience;
        });
        
        return newResult;
      }
    }),
    args: defaultListArgs(db.experience)
  }
};