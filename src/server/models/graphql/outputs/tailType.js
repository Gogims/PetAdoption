const db = require('../../sequelize/db');
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLString } = require('graphql');
const { resolver, defaultListArgs, attributeFields } = require('graphql-sequelize');
const helper = require('../../../../helper');

let tailFields = attributeFields(db.tail);
delete tailFields.tailType;

tailFields.tail = {
  type: new GraphQLNonNull(GraphQLString)
};

const tailType = new GraphQLObjectType({
  name: 'Tail',
  description: 'Type of tail',
  fields: tailFields
});

module.exports = {
  type: tailType,
  schema: {
    type: new GraphQLList(tailType),
    resolve: resolver(db.tail, {
      list: true,
      before: (findOptions, args, context) => {
        const newArgs = Object.assign({}, args);

        if (!helper.isEmpty(newArgs.where) && !helper.isEmpty(newArgs.where.tail)) {
          newArgs.where.tailType = newArgs.where.tail;
          delete newArgs.where.tail;
        }

        const newOptions = Object.assign({}, findOptions, {
          where: newArgs.where
        });

        return newOptions;
      },
      after: (result, args, context) => {
        const newResult = result.map(tail => {
          tail.tail = tail.ownerTail;
          // Tried the delete operator, but property still there
          tail.ownerTail = undefined;
          return tail;
        });
        
        return newResult;
      }
    }),
    args: defaultListArgs(db.tail)
  }
};