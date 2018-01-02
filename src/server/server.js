const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const specie = require('./controllers/specie');
const status = require('./controllers/status');
const port = process.env.PORT || 3000;

var server = restify.createServer({
    name: 'simple restify server'
});

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

server.get('api/specie', specie.get);
server.get('api/specie/:specieId', specie.getById);
server.post('api/specie', specie.post);
server.put('api/specie/:specieId', specie.put);
server.del('api/specie/:specieId', specie.del);

server.get('api/status', status.get);
server.get('api/status/:statusId', status.getById);
server.post('api/status', status.post);
server.put('api/status/:statusId', status.put);
server.del('api/status/:statusId', status.del);

server.listen(port, function(){
    console.log('api running at ' + port);
})