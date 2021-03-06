const db = require('./sequelize/db');
const helper = require('../../helper');
const Promise = require('bluebird');

class User{
    constructor(user) {
        Object.assign(this, user);
        
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    findById(roles){
        const eagerLoadRoles = !roles ? 
        null :
        { include: [{ model: db.role }] };

        return db.user.findById(this.id, eagerLoadRoles)
                .then(user => user);
    }
    
    create(){
        if (helper.isEmpty(this.user)) {
            throw new Error("User name is a required field to create");
        }

        const local = {
            user: this.user
        };

        return db.user.create(local)
                            .then(newUser => newUser)
                            .catch(err => {throw err;});
    }

    update(){
        if (helper.isEmpty(this.id)) {
            throw new Error("Id is a required field to update");
        }

        const local = Object.assign({}, this);
        delete local.id;
        delete local.roles;

        return this.findById(true).then(dbUser => {

            const updatePromise = dbUser.update(local)
                            .then(updatedUser => updatedUser);

            const roleIds = this.roles.map(role => role.id);

            const rolePromise = dbUser.setRoles(roleIds)
                            .then(roles => roles);

            return Promise.all([updatePromise, rolePromise])
                    .then(promises => {
                        return promises[0];
                    })
                    .catch(err => {throw err; });
        });
    }

    delete(){
        if (helper.isEmpty(this.id)) {
            throw new Error("Id is a required field to update");
        }

        const local = {
            id: this.id
        };

        return this.findById().then(dbUser => {
            return dbUser.destroy(local)
                            .then(() => {
                                return {
                                    status: 200,
                                    message: "User Deleted"
                                }
                            }).catch(err => {throw err;});
        });
    }
}

module.exports = User;