const db = require('./sequelize/db');
const helper = require('../../helper');

class User{
    constructor(id, user) {
        this.id = id;
        this.userName = user.userName;
        this.password = user.password;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.zipcode = user.zipcode;
        
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    findById(){
        return db.user.findById(this.id)
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
        else if (helper.isEmpty(this.user)) {
            throw new Error("User name is a required field to update");
        }

        const local = {
            id: this.id,
            user: this.user
        };

        return this.findById().then(dbUser => {
            return dbUser.update(local)
                            .then(updatedUser => updatedUser)
                            .catch(err => { throw err;});
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