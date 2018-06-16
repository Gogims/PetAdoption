const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const myGraphQLSchema = require('./models/graphql/schema');
const cors = require('cors');
const port = process.env.PORT || 3000;
const db = require('./models/sequelize/db');
const jwtExpress = require('express-jwt');
const jwtConfig = require('./config/jwt');

const server = express();

server.use(cors({
    origin: 'http://localhost:8080'
}));

// The GraphQL endpoint
server.use('/graphql', bodyParser.json());
server.use('/graphql', jwtExpress({
    secret: jwtConfig.jwtKey,
    requestProperty: 'user',
    credentialsRequired: false
}));

server.use('/graphql', graphqlExpress(request => {
    return {
        schema: myGraphQLSchema,
        context: {
            db,
            user: request.user
        }
    };
}));

// GraphiQL, a visual editor for queries
server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

server.listen(port, () => {
    console.log('Running a GraphQL API server at localhost:' + port + '/graphql');
});