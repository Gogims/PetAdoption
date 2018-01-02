const errors = require('restify-errors');
const Frequency = require('../models/frequency');

class FrequencyController{
    constructor(){
        this.findFrequencyById = this.findFrequencyById.bind(this);
        this.post = this.post.bind(this);
        this.del = this.del.bind(this);
        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
        this.put = this.put.bind(this);
    }

    findFrequencyById(req){
        return Frequency.findById(req.params.frequencyId).then(frequency => frequency);
    }

    get(req, res, next){
        res.send(200, this.store);
        return next();
    }

    getById(req, res, next){
        const found = this.findFrequencyById(req)
                            .then(frequency => res.send(200, frequency))
                            .catch(error => res.send(404, "frequency not found"));

        return next();
    }

    post(req, res, next){
        if (!req.body.hasOwnProperty('frequency')) {
            return next(new errors.BadRequestError('Frequency is needed'));
        }
        else{
            Frequency.create(req.body)
                    .then(newFrequency => res.send(201, newFrequency));
        }

        return next();
    }

    put(req, res, next){
        if (req.body === undefined) {
            return next(new errors.InvalidContentError('There is no body'));
        }

        if (!req.body.hasOwnProperty('frequency') || !req.params.hasOwnProperty('frequencyId')) {
            return next(new errors.BadRequestError('Object not in right format'));
        }

        this.findFrequencyById(req).then(oldFrequency => {
            oldFrequency.update(req.body)
                    .then(updatedFrequency => res.send(200, updatedFrequency))
                    .catch(error => res.send(404, "there was an error updating the frequency"));
        }).catch(error => res.send(404, "frequency not found!"));;

        return next();
    }

    del(req, res, next){
        this.findFrequencyById(req).then(frequency => {
            frequency.destroy().then(deletedFrequency => res.send(200, "frequency deleted"))
        })

        return next();
    }
}

module.exports = new FrequencyController();