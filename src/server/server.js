const express = require('express');
const graphqlHTTP = require('express-graphql');
const myGraphQLSchema = require('./models/graphql/schema');
const port = process.env.PORT || 3000;

let server = express();

server.use('/graphql', graphqlHTTP({
    schema: myGraphQLSchema,
    graphiql: true
}));

server.listen(port);
console.log('Running a GraphQL API server at localhost:' + port + '/graphql');