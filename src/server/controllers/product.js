const errors = require('restify-errors');
const user = require('../models/user');

class ProductController{
    constructor(){
        this.store = [];

        this.findProductById = this.findProductById.bind(this);
        this.post = this.post.bind(this);
        this.del = this.del.bind(this);
        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
    }

    findProductById(req){
        const found = this.store.filter(
            p => p.id === parseInt(req.params.id)
        )

        if (found && found.length > 0) {
            return found[0];
        }

        return null;
    }

    get(req, res, next){
        res.send(200, this.store);
        return next();
    }

    getById(req, res, next){
        //const found = this.findProductById(req);
        const found = user.findAll().then(users =>{
            res.send(200, users); 
        });
        
        // if (found) {
        //     res.send(200, found);
        // }
        // else{
        //     res.send(404, "product not found");
        // }

        return next();
    }

    post(req, res, next){
        if (!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('name')) {
            res.send(500);
        }
        else{
            this.store.push({
                id: parseInt(req.body.id),
                name: req.body.name
            });

            res.send(201);
        }

        return next();
    }

    put(req, res, next){
        if (req.body === undefined) {
            return next(new errors.InvalidContentError('There is no body'));
        }

        if (!req.body.hasOwnProperty('name')) {
            return next(new errors.BadRequestError('Name was not provided'));
        }

        const found = findProductById(req);
        
        if (found) {
            found.name = req.body.name;
            res.send(200, found);
        } 
        else {
            res.send(404, "product not found");
        }

        return next();
    }

    del(req, res, next){
        this.store = this.store.filter(function (p) {
            return p.id !== parseInt(req.params.id);
        });
        res.send(200);

        return next();
    }
}

module.exports = new ProductController();