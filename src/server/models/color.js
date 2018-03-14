const db = require('./sequelize/db');
const helper = require('../../helper');

class Color{
    constructor(id, color) {
        this.id = id;
        this.color = color;
        
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    findById(){
        return db.color.findById(this.id)
                .then(color => color);
    }
    
    create(){
        if (helper.isEmpty(this.color)) {
            throw error("Color name is a required field to create");
        }

        const local = {
            color: this.color
        };

        return db.color.create(local)
                            .then(newColor => newColor)
                            .catch(err => {throw err;});
    }

    update(){
        if (helper.isEmpty(this.id)) {
            throw error("Id is a required field to update");
        }
        else if (helper.isEmpty(this.color)) {
            throw error("Color name is a required field to update");
        }

        const local = {
            id: this.id,
            color: this.color
        }

        return this.findById().then(dbColor => {
            return dbColor.update(local)
                            .then(updatedColor => updatedColor)
                            .catch(err => { throw err;});
        })
    }

    delete(){
        if (helper.isEmpty(this.id)) {
            throw error("Id is a required field to update");
        }

        const local = {
            id: this.id
        }

        return this.findById().then(dbColor => {
            return dbColor.destroy(local)
                            .then(() => {
                                return {
                                    color: 200,
                                    message: "Color Deleted"
                                }
                            }).catch(err => {throw err;});
        })
    }
}

module.exports = Color;