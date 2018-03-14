const db = require('./sequelize/db');
const helper = require('../../helper');

class Reaction{
    constructor(id, reaction) {
        this.id = id;
        this.reaction = reaction;
        
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    findById(){
        return db.reaction.findById(this.id)
                .then(reaction => reaction);
    }
    
    create(){
        if (helper.isEmpty(this.reaction)) {
            throw error("Reaction name is a required field to create");
        }

        const local = {
            reaction: this.reaction
        };

        return db.reaction.create(local)
                            .then(newReaction => newReaction)
                            .catch(err => {throw err;});
    }

    update(){
        if (helper.isEmpty(this.id)) {
            throw error("Id is a required field to update");
        }
        else if (helper.isEmpty(this.reaction)) {
            throw error("Reaction name is a required field to update");
        }

        const local = {
            id: this.id,
            reaction: this.reaction
        }

        return this.findById().then(dbReaction => {
            return dbReaction.update(local)
                            .then(updatedReaction => updatedReaction)
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

        return this.findById().then(dbReaction => {
            return dbReaction.destroy(local)
                            .then(() => {
                                return {
                                    status: 200,
                                    message: "Reaction Deleted"
                                }
                            }).catch(err => {throw err;});
        })
    }
}

module.exports = Reaction;