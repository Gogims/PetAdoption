const db = require('./sequelize/db');
const helper = require('../../helper');

class Specie{
    constructor(id, specie) {
        this.id = id;
        this.specie = specie;
        
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    findById(){
        return db.specie.findById(this.id)
                .then(specie => specie);
    }
    
    create(){
        if (helper.isEmpty(this.specie)) {
            throw error("Specie name is a required field to create");
        }

        const local = {
            specie: this.specie
        };

        return db.specie.create(local)
                            .then(newSpecie => newSpecie)
                            .catch(err => {throw err;});
    }

    update(){
        if (helper.isEmpty(this.id)) {
            throw error("Id is a required field to update");
        }
        else if (helper.isEmpty(this.specie)) {
            throw error("Specie name is a required field to update");
        }

        const local = {
            id: this.id,
            specie: this.specie
        }

        return this.findById().then(dbSpecie => {
            return dbSpecie.update(local)
                            .then(updatedSpecie => updatedSpecie)
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

        return this.findById().then(dbSpecie => {
            return dbSpecie.destroy(local)
                            .then(() => {
                                return {
                                    status: 200,
                                    message: "Specie Deleted"
                                }
                            }).catch(err => {throw err;});
        })
    }
}

module.exports = Specie;