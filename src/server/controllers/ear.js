const errors = require('restify-errors');
const Ear = require('../models/ear');

class EarController{
    constructor(){
        this.findEarById = this.findEarById.bind(this);
        this.post = this.post.bind(this);
        this.del = this.del.bind(this);
        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
        this.put = this.put.bind(this);
    }

    findEarById(req){
        return Ear.findById(req.params.earId).then(ear => ear);
    }

    get(req, res, next){
        res.send(200, this.store);
        return next();
    }

    getById(req, res, next){
        const found = this.findEarById(req)
                            .then(ear => res.send(200, ear))
                            .catch(error => res.send(404, "ear not found"));

        return next();
    }

    post(req, res, next){
        if (!req.body.hasOwnProperty('ear')) {
            return next(new errors.BadRequestError('Ear is needed'));
        }
        else{
            const earBody = {
                earId: req.body.earId,
                earType: req.body.ear
            };

            Ear.create(earBody)
                    .then(newEar => res.send(201, newEar));
        }

        return next();
    }

    put(req, res, next){
        if (req.body === undefined) {
            return next(new errors.InvalidContentError('There is no body'));
        }

        if (!req.body.hasOwnProperty('ear') || !req.params.hasOwnProperty('earId')) {
            return next(new errors.BadRequestError('Object not in right format'));
        }

        const earBody = {
            earId: req.body.earId,
            earType: req.body.ear
        };

        this.findEarById(req).then(oldEar => {
            oldEar.update(earBody)
                    .then(updatedEar => res.send(200, updatedEar))
                    .catch(error => res.send(404, "there was an error updating the ear"));
        }).catch(error => res.send(404, "ear not found!"));;

        return next();
    }

    del(req, res, next){
        this.findEarById(req).then(ear => {
            ear.destroy().then(deletedEar => res.send(200, "ear deleted"))
        })

        return next();
    }
}

module.exports = new EarController();