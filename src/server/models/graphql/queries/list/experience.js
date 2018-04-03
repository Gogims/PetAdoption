const db = require('../../../sequelize/db');
const { GraphQLList } = require('graphql');
const { resolver, defaultListArgs } = require('graphql-sequelize');
const helper = require('../../../../../helper');
const experienceType = require('../../types/experience');

module.exports = {
  schema: {
    type: new GraphQLList(experienceType),
    resolve: resolver(db.experience, {
      list: true,
      before: (findOptions, args, context) => {
        const newArgs = Object.assign({}, args);

        if (!helper.isEmpty(newArgs.where) && !helper.isEmpty(newArgs.where.experience)) {
          newArgs.where.ownerExperience = newArgs.where.experience;
          delete newArgs.where.experience;
        }

        const newOptions = Object.assign({}, findOptions, {
          where: newArgs.where
        });

        return newOptions;
      },
      after: (result, args, context) => {
        const newResult = result.map(experienceDb => {
          const experience = experienceDb.dataValues;
          experience.experience = experience.ownerExperience;
          delete experience.ownerExperience;

          return experience;
        });
        
        return newResult;
      }
    }),
    args: defaultListArgs(db.experience)
  }
};