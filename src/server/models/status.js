const db = require('./sequelize/db');
const helper = require('../../helper');

class Status{
    constructor(id, status) {
        this.id = id;
        this.status = status;
        
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    findById(){
        return db.status.findById(this.id)
                .then(status => status);
    }
    
    create(){
        if (helper.isEmpty(this.status)) {
            throw error("Status name is a required field to create");
        }

        const local = {
            status: this.status
        };

        return db.status.create(local)
                            .then(newStatus => newStatus)
                            .catch(err => {throw err;});
    }

    update(){
        if (helper.isEmpty(this.id)) {
            throw error("Id is a required field to update");
        }
        else if (helper.isEmpty(this.status)) {
            throw error("Status name is a required field to update");
        }

        const local = {
            id: this.id,
            status: this.status
        }

        return this.findById().then(dbStatus => {
            return dbStatus.update(local)
                            .then(updatedStatus => updatedStatus)
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

        return this.findById().then(dbStatus => {
            return dbStatus.destroy(local)
                            .then(() => {
                                return {
                                    status: 200,
                                    message: "Status Deleted"
                                }
                            }).catch(err => {throw err;});
        })
    }
}

module.exports = Status;