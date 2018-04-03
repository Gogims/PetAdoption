const db = require('../../../sequelize/db');
const { GraphQLList } = require('graphql');
const { resolver, defaultListArgs } = require('graphql-sequelize');
const petType = require('../../types/pet');
  
module.exports = {
    schema: {
        type: new GraphQLList(petType),
        resolve: resolver(db.pet, {
        list: true
        }),
        args: defaultListArgs(db.pet)
    }
};