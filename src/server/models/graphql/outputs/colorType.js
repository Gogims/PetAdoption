const db = require('../../sequelize/db');
const { GraphQLObjectType, GraphQLList } = require('graphql');
const { resolver, defaultListArgs, attributeFields } = require('graphql-sequelize');

const colorType = new GraphQLObjectType({
  name: 'Color',
  description: 'A color like brown',
  fields: attributeFields(db.color)
});

module.exports = {
  type: colorType,
  schema: {
    type: new GraphQLList(colorType),
    resolve: resolver(db.color, {
      list: true
    }),
    args: defaultListArgs(db.color)
  }
};