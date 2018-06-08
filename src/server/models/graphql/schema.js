const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const fs = require('fs');
const path = require('path');
const helper = require('../../../helper');

let schemaList = new Object();
const queryListPath = path.join(__dirname, 'queries', 'list');

fs.readdirSync(queryListPath)
.filter(file => file != "pagination.js")
.forEach(file => {
  const query = require(path.join(queryListPath, file));
  const propertyName = helper.pluralize(file.slice(0, -3));
  Object.assign(schemaList, {
      [propertyName]: query.schema
    });
});

const queryPath = path.join(__dirname, 'queries');

fs.readdirSync(queryPath)
.filter(file => file != "list")
.forEach(file => {
  const query = require(path.join(queryPath, file));
  const propertyName = file.slice(0, -3);
  Object.assign(schemaList, {
      [propertyName]: query.schema
    });
});

let mutationList = new Object();
const mutationPath = path.join(__dirname, 'mutations');

fs.readdirSync(mutationPath)
.forEach(file => {
  const mutation = require(path.join(mutationPath, file));
  Object.assign(mutationList, mutation);
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: schemaList
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: mutationList
    })
});

module.exports = schema;