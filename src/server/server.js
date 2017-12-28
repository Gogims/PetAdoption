const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const specie = require('./controllers/specie');
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
server.get('api/specie/:id', specie.getById);
server.post('api/specie', specie.post);
server.put('api/specie/:id', specie.put);
server.del('api/specie/:id', specie.del);

server.listen(port, function(){
    console.log('api running at ' + port);
})