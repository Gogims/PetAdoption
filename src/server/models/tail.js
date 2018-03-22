const db = require('./sequelize/db');
const helper = require('../../helper');

class Tail{
    constructor(id, tailType) {
        this.id = id;
        this.tailType = tailType;
        
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.toGraphQL = this.toGraphQL.bind(this);
    }

    toGraphQL(dbTail) {
        let tail = Object.assign({}, dbTail.dataValues);
        tail.tail = dbTail.tailType;
        delete tail.tailType;

        return tail;
    }

    findById(){
        return db.tail.findById(this.id)
                .then(tail => tail);
    }
    
    create(){
        if (helper.isEmpty(this.tailType)) {
            throw new Error("Tail name is a required field to create");
        }

        const local = {
            tailType: this.tailType
        };

        return db.tail.create(local)
                            .then(newTail => this.toGraphQL(newTail))
                            .catch(err => {throw err;});
    }

    update(){
        if (helper.isEmpty(this.id)) {
            throw new Error("Id is a required field to update");
        }
        else if (helper.isEmpty(this.tailType)) {
            throw new Error("Tail name is a required field to update");
        }

        const local = {
            id: this.id,
            tailType: this.tailType
        }

        return this.findById().then(dbTail => {
            return dbTail.update(local)
                            .then(updatedTail => this.toGraphQL(updatedTail))
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

        return this.findById().then(dbTail => {
            return dbTail.destroy(local)
                            .then(() => {
                                return {
                                    status: 200,
                                    message: "Tail Deleted"
                                }
                            }).catch(err => {throw err;});
        })
    }
}

module.exports = Tail;