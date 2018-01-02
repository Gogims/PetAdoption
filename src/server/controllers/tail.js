const errors = require('restify-errors');
const Tail = require('../models/tail');

class TailController{
    constructor(){
        this.findTailById = this.findTailById.bind(this);
        this.post = this.post.bind(this);
        this.del = this.del.bind(this);
        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
        this.update = this.update.bind(this);
    }

    findTailById(req){
        return Tail.findById(req.params.tailId).then(tail => tail);
    }

    get(req, res, next){
        res.send(200, this.store);
        return next();
    }

    getById(req, res, next){
        const found = this.findTailById(req)
                            .then(tail => res.send(200, tail))
                            .catch(error => res.send(404, "tail not found"));

        return next();
    }

    post(req, res, next){
        if (!req.body.hasOwnProperty('tail')) {
            return next(new errors.BadRequestError('Tail is needed'));
        }
        else{
            const tailBody = {
                tailId: req.body.tailId,
                tailType: req.body.tail
            };

            Tail.create(tailBody)
                    .then(newTail => res.send(201, newTail));
        }

        return next();
    }

    put(req, res, next){
        if (req.body === undefined) {
            return next(new errors.InvalidContentError('There is no body'));
        }

        if (!req.body.hasOwnProperty('tail') || !req.params.hasOwnProperty('tailId')) {
            return next(new errors.BadRequestError('Object not in right format'));
        }

        const tailBody = {
            tailId: req.body.tailId,
            tailType: req.body.tail
        };

        this.findTailById(req).then(oldTail => {
            oldTail.update(tailBody)
                    .then(updatedTail => res.send(200, updatedTail))
                    .catch(error => res.send(404, "there was an error updating the tail"));
        }).catch(error => res.send(404, "tail not found!"));;

        return next();
    }

    del(req, res, next){
        this.findTailById(req).then(tail => {
            tail.destroy().then(deletedTail => res.send(200, "tail deleted"))
        })

        return next();
    }
}

module.exports = new TailController();