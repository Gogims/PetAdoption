const errors = require('restify-errors');
const Status = require('../models/status');

class StatusController{
    constructor(){
        this.findStatusById = this.findStatusById.bind(this);
        this.post = this.post.bind(this);
        this.del = this.del.bind(this);
        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
        this.put = this.put.bind(this);
    }

    findStatusById(req){
        return Status.findById(req.params.statusId).then(status => status);
    }

    get(req, res, next){
        res.send(200, this.store);
        return next();
    }

    getById(req, res, next){
        const found = this.findStatusById(req)
                            .then(status => res.send(200, status))
                            .catch(error => res.send(404, "status not found"));

        return next();
    }

    post(req, res, next){
        if (!req.body.hasOwnProperty('status')) {
            return next(new errors.BadRequestError('Status is needed'));
        }
        else{
            Status.create(req.body)
                    .then(newStatus => res.send(201, newStatus));
        }

        return next();
    }

    put(req, res, next){
        if (req.body === undefined) {
            return next(new errors.InvalidContentError('There is no body'));
        }

        if (!req.body.hasOwnProperty('status') || !req.params.hasOwnProperty('statusId')) {
            return next(new errors.BadRequestError('Object not in right format'));
        }

        this.findStatusById(req).then(oldStatus => {
            oldStatus.update(req.body)
                    .then(updatedStatus => res.send(200, updatedStatus))
                    .catch(error => res.send(404, "there was an error updating the status"));
        }).catch(error => res.send(404, "status not found!"));;

        return next();
    }

    del(req, res, next){
        this.findStatusById(req).then(status => {
            status.destroy().then(deletedStatus => res.send(200, "status deleted"))
        })

        return next();
    }
}

module.exports = new StatusController();