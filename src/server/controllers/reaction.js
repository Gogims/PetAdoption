const errors = require('restify-errors');
const Reaction = require('../models/reaction');

class ReactionController{
    constructor(){
        this.findReactionById = this.findReactionById.bind(this);
        this.post = this.post.bind(this);
        this.del = this.del.bind(this);
        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
        this.put = this.put.bind(this);
    }

    findReactionById(req){
        return Reaction.findById(req.params.reactionId).then(reaction => reaction);
    }

    get(req, res, next){
        res.send(200, this.store);
        return next();
    }

    getById(req, res, next){
        const found = this.findReactionById(req)
                            .then(reaction => res.send(200, reaction))
                            .catch(error => res.send(404, "reaction not found"));

        return next();
    }

    post(req, res, next){
        if (!req.body.hasOwnProperty('reaction')) {
            return next(new errors.BadRequestError('Reaction is needed'));
        }
        else{
            Reaction.create(req.body)
                    .then(newReaction => res.send(201, newReaction));
        }

        return next();
    }

    put(req, res, next){
        if (req.body === undefined) {
            return next(new errors.InvalidContentError('There is no body'));
        }

        if (!req.body.hasOwnProperty('reaction') || !req.params.hasOwnProperty('reactionId')) {
            return next(new errors.BadRequestError('Object not in right format'));
        }

        this.findReactionById(req).then(oldReaction => {
            oldReaction.update(req.body)
                    .then(updatedReaction => res.send(200, updatedReaction))
                    .catch(error => res.send(404, "there was an error updating the reaction"));
        }).catch(error => res.send(404, "reaction not found!"));;

        return next();
    }

    del(req, res, next){
        this.findReactionById(req).then(reaction => {
            reaction.destroy().then(deletedReaction => res.send(200, "reaction deleted"))
        })

        return next();
    }
}

module.exports = new ReactionController();