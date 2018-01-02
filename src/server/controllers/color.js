const errors = require('restify-errors');
const Color = require('../models/color');

class ColorController{
    constructor(){
        this.findColorById = this.findColorById.bind(this);
        this.post = this.post.bind(this);
        this.del = this.del.bind(this);
        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
        this.put = this.put.bind(this);
    }

    findColorById(req){
        return Color.findById(req.params.colorId).then(color => color);
    }

    get(req, res, next){
        res.send(200, this.store);
        return next();
    }

    getById(req, res, next){
        const found = this.findColorById(req)
                            .then(color => res.send(200, color))
                            .catch(error => res.send(404, "color not found"));

        return next();
    }

    post(req, res, next){
        if (!req.body.hasOwnProperty('color')) {
            return next(new errors.BadRequestError('Color is needed'));
        }
        else{
            Color.create(req.body)
                    .then(newColor => res.send(201, newColor));
        }

        return next();
    }

    put(req, res, next){
        if (req.body === undefined) {
            return next(new errors.InvalidContentError('There is no body'));
        }

        if (!req.body.hasOwnProperty('color') || !req.params.hasOwnProperty('colorId')) {
            return next(new errors.BadRequestError('Object not in right format'));
        }

        this.findColorById(req).then(oldColor => {
            oldColor.update(req.body)
                    .then(updatedColor => res.send(200, updatedColor))
                    .catch(error => res.send(404, "there was an error updating the color"));
        }).catch(error => res.send(404, "color not found!"));;

        return next();
    }

    del(req, res, next){
        this.findColorById(req).then(color => {
            color.destroy().then(deletedColor => res.send(200, "color deleted"))
        })

        return next();
    }
}

module.exports = new ColorController();