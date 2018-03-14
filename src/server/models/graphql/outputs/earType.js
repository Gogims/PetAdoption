const db = require('../../sequelize/db');
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLString } = require('graphql');
const { resolver, defaultListArgs, attributeFields } = require('graphql-sequelize');
const helper = require('../../../../helper');

let earFields = attributeFields(db.ear);
delete earFields.earType;

earFields.ear = {
  type: new GraphQLNonNull(GraphQLString)
};

const earType = new GraphQLObjectType({
  name: 'Ear',
  description: 'Type of ear',
  fields: earFields
});

module.exports = {
  type: earType,
  schema: {
    type: new GraphQLList(earType),
    resolve: resolver(db.ear, {
      list: true,
      before: (findOptions, args, context) => {
        const newArgs = Object.assign({}, args);

        if (!helper.isEmpty(newArgs.where) && !helper.isEmpty(newArgs.where.ear)) {
          newArgs.where.earType = newArgs.where.ear;
          delete newArgs.where.ear;
        }

        const newOptions = Object.assign({}, findOptions, {
          where: newArgs.where
        });

        return newOptions;
      },
      after: (result, args, context) => {
        const newResult = result.map(ear => {
          ear.ear = ear.ownerEar;
          // Tried the delete operator, but property still there
          ear.ownerEar = undefined;
          return ear;
        });
        
        return newResult;
      }
    }),
    args: defaultListArgs(db.ear)
  }
};