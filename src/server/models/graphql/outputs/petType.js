const db = require('../../sequelize/db');
const { GraphQLObjectType, GraphQLList } = require('graphql');
const { resolver, defaultListArgs, attributeFields } = require('graphql-sequelize');

const petType = new GraphQLObjectType({
    name: 'Pet',
    description: 'A pet like Brodie',
    fields: attributeFields(db.pet)
  });
  
module.exports = {
    type: petType,
    schema: {
        type: new GraphQLList(petType),
        resolve: resolver(db.pet, {
        list: true
        }),
        args: defaultListArgs(db.pet)
    }
};