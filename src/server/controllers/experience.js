const errors = require('restify-errors');
const Experience = require('../models/experience');

class ExperienceController{
    constructor(){
        this.findExperienceById = this.findExperienceById.bind(this);
        this.post = this.post.bind(this);
        this.del = this.del.bind(this);
        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
        this.put = this.put.bind(this);
    }

    findExperienceById(req){
        return Experience.findById(req.params.experienceId).then(experience => experience);
    }

    get(req, res, next){
        res.send(200, this.store);
        return next();
    }

    getById(req, res, next){
        const found = this.findExperienceById(req)
                            .then(experience => res.send(200, experience))
                            .catch(error => res.send(404, "experience not found"));

        return next();
    }

    post(req, res, next){
        if (!req.body.hasOwnProperty('experience')) {
            return next(new errors.BadRequestError('Experience is needed'));
        }
        else{
            const experienceBody = {
                experienceId: req.body.experienceId,
                ownerExperience: req.body.experience
            };

            Experience.create(experienceBody)
                    .then(newExperience => res.send(201, newExperience));
        }

        return next();
    }

    put(req, res, next){
        if (req.body === undefined) {
            return next(new errors.InvalidContentError('There is no body'));
        }

        if (!req.body.hasOwnProperty('experience') || !req.params.hasOwnProperty('experienceId')) {
            return next(new errors.BadRequestError('Object not in right format'));
        }

        const experienceBody = {
            experienceId: req.body.experienceId,
            ownerExperience: req.body.experience
        };

        this.findExperienceById(req).then(oldExperience => {
            oldExperience.update(experienceBody)
                    .then(updatedExperience => res.send(200, updatedExperience))
                    .catch(error => res.send(404, "there was an error updating the experience"));
        }).catch(error => res.send(404, "experience not found!"));;

        return next();
    }

    del(req, res, next){
        this.findExperienceById(req).then(experience => {
            experience.destroy().then(deletedExperience => res.send(200, "experience deleted"))
        })

        return next();
    }
}

module.exports = new ExperienceController();