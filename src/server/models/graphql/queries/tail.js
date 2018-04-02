const db = require('../../sequelize/db');
const { GraphQLList } = require('graphql');
const { resolver, defaultListArgs } = require('graphql-sequelize');
const helper = require('../../../../helper');
const tailType = require('../types/tail');

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
        const newResult = result.map(tailDb => {
          const tail = tailDb.dataValues;
          tail.tail = tail.tailType;
          delete tail.tailType;
          
          return tail;
        });
        
        return newResult;
      }
    }),
    args: defaultListArgs(db.tail)
  }
};