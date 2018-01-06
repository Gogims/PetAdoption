const { resolver, defaultListArgs } = require('graphql-sequelize');
const specie = require('./specie');
const graphQL = require('graphql');

let mutationList = new Object();
Object.assign(mutationList, specie);

module.exports = mutationList;