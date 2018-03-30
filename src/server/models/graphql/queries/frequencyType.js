const db = require('../../sequelize/db');
const { GraphQLObjectType, GraphQLList } = require('graphql');
const { resolver, defaultListArgs, attributeFields } = require('graphql-sequelize');

const frequencyType = new GraphQLObjectType({
  name: 'Frequency',
  description: 'Description of frequency',
  fields: attributeFields(db.frequency)
});

module.exports = {
  type: frequencyType,
  schema: {
    type: new GraphQLList(frequencyType),
    resolve: resolver(db.frequency, {
      list: true
    }),
    args: defaultListArgs(db.frequency)
  }
};