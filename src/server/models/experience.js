const db = require('./sequelize/db');
const helper = require('../../helper');

class Experience{
    constructor(id, experience) {
        this.id = id;
        this.ownerExperience = experience;
        
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.toGraphQL = this.toGraphQL.bind(this);
    }

    toGraphQL(dbExperience) {
        let exp = Object.assign({}, dbExperience.dataValues);
        exp.experience = dbExperience.ownerExperience;
        delete exp.ownerExperience;

        return exp;
    }

    findById(){
        return db.experience.findById(this.id)
                .then(experience => experience);
    }
    
    create(){
        if (helper.isEmpty(this.ownerExperience)) {
            throw new Error("Experience name is a required field to create");
        }

        const local = {
            ownerExperience: this.ownerExperience
        };

        return db.experience.create(local)
                            .then(newExperience => this.toGraphQL(newExperience))
                            .catch(err => {throw err;});
    }

    update(){
        if (helper.isEmpty(this.id)) {
            throw new Error("Id is a required field to update");
        }
        else if (helper.isEmpty(this.ownerExperience)) {
            throw new Error("Experience name is a required field to update");
        }

        const local = {
            id: this.id,
            ownerExperience: this.ownerExperience
        }

        return this.findById().then(dbExperience => {
            return dbExperience.update(local)
                            .then(updatedExperience => this.toGraphQL(updatedExperience))
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

        return this.findById().then(dbExperience => {
            return dbExperience.destroy(local)
                            .then(() => {
                                return {
                                    status: 200,
                                    message: "Experience Deleted"
                                }
                            }).catch(err => {throw err;});
        })
    }
}

module.exports = Experience;