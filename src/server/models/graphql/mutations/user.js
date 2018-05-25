const userType = require('../types/user');
const userInput = require('../types/inputs/user');
const { GraphQLNonNull } = require('graphql');
const User = require('../../user');
const { resolver } = require('graphql-sequelize');
const deletedType = require('../types/deleted');
const db = require('../../sequelize/db');

const userMutation = {
    createUser: {
        type:  userType,
        description: "Creates a new user",
        args:{
            input: {
                type: new GraphQLNonNull(userInput)
            }
        },
        resolve: (root, {input}, context) => {
            const user = new User(input);
            return user.create();
        }
    },
    updateUser: {
        type: userType,
        description: "Updates an existing user",
        args:{
            input:{
                type: new GraphQLNonNull(userInput)
            }
        },
        resolve: (root, {input}, context, info) => {
            const user = new User(input);
            return user.update();
        }
    },
    deleteUser: {
        type: deletedType,
        description: "Deletes an existing user",
        args:{
            input:{
                type: new GraphQLNonNull(userInput)
            }
        },
        resolve: (root, {input}, context) => {
            const user = new User(input);
            return user.delete();
        }
    }
}

module.exports = userMutation;