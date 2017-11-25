const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const products = require('./controllers/product');
const port = process.env.PORT || 3000;

var server = restify.createServer({
    name: 'simple restify server'
});

server.use(function(req, res, next){
    console.log(req.method + ' ' + req.url);
    return next();
});

const cors = corsMiddleware({
    //preflightMaxAge: 5, //Optional
    origins: ['http://localhost:8080']//,
    //allowHeaders: ['API-Token'],
    //exposeHeaders: ['API-Token-Expiry']
  });

server.use(cors.actual);
server.use(restify.plugins.bodyParser());

server.get('api/products', products.get);
server.get('api/products/:id', products.getById);
server.post('api/products', products.post);
server.put('api/products/:id', products.put);
server.del('api/products/:id', products.del);

server.listen(port, function(){
    console.log('api running at ' + port);
})