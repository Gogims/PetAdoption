const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const specie = require('./controllers/specie');
const status = require('./controllers/status');
const graphqlRestify = require('graphql-server-restify').graphqlRestify;
const graphiqlRestify = require('graphql-server-restify').graphiqlRestify;
const myGraphQLSchema = {};
const port = process.env.PORT || 3000;

let server = restify.createServer({
    name: 'simple restify server'
});

const graphQLOptions = { schema: myGraphQLSchema };

server.use(function(req, res, next){
    console.log(req.method + ' ' + req.url);
    return next();
});

const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['http://localhost:8080']
    //allowHeaders: ['API-Token'],
    //exposeHeaders: ['API-Token-Expiry']
  });


server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());

server.post('/graphql', graphqlRestify(graphQLOptions));
server.get('/graphql', graphqlRestify(graphQLOptions));
 
server.get('/graphiql', graphiqlRestify({ endpointURL: '/graphql' }));

server.listen(port, () => console.log('api running at ' + port));