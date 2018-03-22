const db = require('./sequelize/db');
const helper = require('../../helper');

class Role{
    constructor(id, role, userId) {
        this.id = id;
        this.role = role;
        this.userId = userId;
        
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    findById(){
        return db.role.findById(this.id)
                .then(role => role);
    }
    
    create(){
        if (helper.isEmpty(this.role)) {
            throw new Error("Role name is a required field to create");
        }

        const local = {
            role: this.role
        };

        return db.role.create(local)
                            .then(newRole => newRole)
                            .catch(err => {throw err;});
    }

    update(){
        if (helper.isEmpty(this.id)) {
            throw new Error("Id is a required field to update");
        }
        else if (helper.isEmpty(this.role)) {
            throw new Error("Role name is a required field to update");
        }
        else if (helper.isEmpty(this.userId)) {
            throw new Error("User Id is a required field to update");
        }

        const local = {
            id: this.id,
            userId: this.userId,
            role: this.role
        }

        return this.findById().then(dbRole => {
            return dbRole.update(local)
                            .then(updatedRole => updatedRole)
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

        return this.findById().then(dbRole => {
            return dbRole.destroy(local)
                            .then(() => {
                                return {
                                    status: 200,
                                    message: "Role Deleted"
                                }
                            }).catch(err => {throw err;});
        })
    }
}

module.exports = Role;