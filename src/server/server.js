const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const myGraphQLSchema = require('./models/graphql/schema');
const port = process.env.PORT || 3000;

let server = express();

// The GraphQL endpoint
server.use('/graphql', bodyParser.json(), graphqlExpress({
    schema: myGraphQLSchema
}));

// GraphiQL, a visual editor for queries
server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

server.listen(port, () => {
    console.log('Running a GraphQL API server at localhost:' + port + '/graphql');
});