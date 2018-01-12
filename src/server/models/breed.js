const db = require('./sequelize/db');
const helper = require('../../helper');

class Breed{
    constructor(id, breed, specieId) {
        this.id = id;
        this.breed = breed;
        this.specieId = specieId;
        
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    findById(){
        return db.breed.findById(this.id)
                .then(breed => breed);
    }
    
    create(){
        if (helper.isEmpty(this.breed)) {
            throw error("Breed name is a required field to create");
        }
        else if (helper.isEmpty(this.specieId)) {
            throw error("Specie Id is a required field to create");
        }

        const local = {
            breed: this.breed,
            specieId: this.specieId
        };

        return db.breed.create(local)
                            .then(newBreed => newBreed)
                            .catch(err => {throw err;});
    }

    update(){
        if (helper.isEmpty(this.id)) {
            throw error("Id is a required field to update");
        }
        else if (helper.isEmpty(this.breed)) {
            throw error("Breed name is a required field to update");
        }
        else if (helper.isEmpty(this.specieId)) {
            throw error("Specie Id is a required field to update");
        }

        const local = {
            id: this.id,
            specieId: this.specieId,
            breed: this.breed
        }

        return this.findById().then(dbBreed => {
            return dbBreed.update(local)
                            .then(updatedBreed => updatedBreed)
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

        return this.findById().then(dbBreed => {
            return dbBreed.destroy(local)
                            .then(() => {
                                return {
                                    status: 200,
                                    message: "Breed Deleted"
                                }
                            }).catch(err => {throw err;});
        })
    }
}

module.exports = Breed;