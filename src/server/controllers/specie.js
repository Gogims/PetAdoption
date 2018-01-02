const errors = require('restify-errors');
const Specie = require('../models/specie');

class SpecieController{
    constructor(){
        this.findSpecieById = this.findSpecieById.bind(this);
        this.post = this.post.bind(this);
        this.del = this.del.bind(this);
        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
        this.put = this.put.bind(this);
    }

    findSpecieById(req){
        return Specie.findById(req.params.specieId).then(specie => specie);
    }

    get(req, res, next){
        res.send(200, this.store);
        return next();
    }

    getById(req, res, next){
        const found = this.findSpecieById(req)
                            .then(specie => res.send(200, specie))
                            .catch(error => res.send(404, "specie not found"));

        return next();
    }

    post(req, res, next){
        if (!req.body.hasOwnProperty('specie')) {
            return next(new errors.BadRequestError('Specie is needed'));
        }
        else{
            Specie.create(req.body)
                    .then(newSpecie => res.send(201, newSpecie));
        }

        return next();
    }

    put(req, res, next){
        if (req.body === undefined) {
            return next(new errors.InvalidContentError('There is no body'));
        }

        if (!req.body.hasOwnProperty('specie') || !req.params.hasOwnProperty('specieId')) {
            return next(new errors.BadRequestError('Object not in right format'));
        }

        this.findSpecieById(req).then(oldSpecie => {
            oldSpecie.update(req.body)
                    .then(updatedSpecie => res.send(200, updatedSpecie))
                    .catch(error => res.send(404, "there was an error updating the specie"));
        }).catch(error => res.send(404, "specie not found!"));;

        return next();
    }

    del(req, res, next){
        this.findSpecieById(req).then(specie => {
            specie.destroy().then(deletedSpecie => res.send(200, "specie deleted"))
        })

        return next();
    }
}

module.exports = new SpecieController();