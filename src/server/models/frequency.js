const db = require('./sequelize/db');
const helper = require('../../helper');

class Frequency{
    constructor(id, frequency) {
        this.id = id;
        this.frequency = frequency;
        
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    findById(){
        return db.frequency.findById(this.id)
                .then(frequency => frequency);
    }
    
    create(){
        if (helper.isEmpty(this.frequency)) {
            throw new Error("Frequency name is a required field to create");
        }

        const local = {
            frequency: this.frequency
        };

        return db.frequency.create(local)
                            .then(newFrequency => newFrequency)
                            .catch(err => {throw err;});
    }

    update(){
        if (helper.isEmpty(this.id)) {
            throw new Error("Id is a required field to update");
        }
        else if (helper.isEmpty(this.frequency)) {
            throw new Error("Frequency name is a required field to update");
        }

        const local = {
            id: this.id,
            frequency: this.frequency
        }

        return this.findById().then(dbFrequency => {
            return dbFrequency.update(local)
                            .then(updatedFrequency => updatedFrequency)
                            .catch(err => { throw err;});
        })
    }

    delete(){
        if (helper.isEmpty(this.id)) {
            throw new Error("Id is a required field to update");
        }

        const local = {
            id: this.id
        }

        return this.findById().then(dbFrequency => {
            return dbFrequency.destroy(local)
                            .then(() => {
                                return {
                                    frequency: 200,
                                    message: "Frequency Deleted"
                                }
                            }).catch(err => {throw err;});
        })
    }
}

module.exports = Frequency;