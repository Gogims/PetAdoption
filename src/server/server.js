const restify = require('restify');
const products = require('./controllers/product');
const port = process.env.PORT || 3000;
console.log(process.env.NODE_ENV);

var server = restify.createServer({
    name: 'simple restify server'
});

server.use(function(req, res, next){
    console.log(req.method + ' ' + req.url);
    return next();
});

server.use(restify.plugins.bodyParser());

server.get('api/products', products.get);
server.get('api/products/:id', products.getById);
server.post('api/products', products.post);
server.put('api/products/:id', products.put);
server.del('api/products/:id', products.del);

server.listen(port, function(){
    console.log('api running at ' + port);
})