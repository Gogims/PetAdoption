const db = require('./sequelize/db');
const helper = require('../../helper');

class Ear{
    constructor(id, earType) {
        this.id = id;
        this.earType = earType;
        
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.toGraphQL = this.toGraphQL.bind(this);
    }

    toGraphQL(dbEar) {
        let ear = Object.assign({}, dbEar.dataValues);
        ear.ear = dbEar.earType;
        delete ear.earType;

        return ear;
    }

    findById(){
        return db.ear.findById(this.id)
                .then(ear => ear);
    }
    
    create(){
        if (helper.isEmpty(this.earType)) {
            throw new Error("Ear name is a required field to create");
        }

        const local = {
            earType: this.earType
        };

        return db.ear.create(local)
                            .then(newEar => this.toGraphQL(newEar))
                            .catch(err => {throw err;});
    }

    update(){
        if (helper.isEmpty(this.id)) {
            throw new Error("Id is a required field to update");
        }
        else if (helper.isEmpty(this.earType)) {
            throw new Error("Ear name is a required field to update");
        }

        const local = {
            id: this.id,
            earType: this.earType
        }

        return this.findById().then(dbEar => {
            return dbEar.update(local)
                            .then(updatedEar => this.toGraphQL(updatedEar))
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

        return this.findById().then(dbEar => {
            return dbEar.destroy(local)
                            .then(() => {
                                return {
                                    status: 200,
                                    message: "Ear Deleted"
                                }
                            }).catch(err => {throw err;});
        })
    }
}

module.exports = Ear;