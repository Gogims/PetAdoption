const userOutput = require('../outputs/userType');
const userInput = require('../inputs/userType');
const { GraphQLNonNull } = require('graphql');
const User = require('../../user');
const { resolver } = require('graphql-sequelize');
const deletedType = require('../outputs/deleted');
const db = require('../../sequelize/db');

const userMutation = {
    createUser: {
        type:  userOutput.type,
        description: "Creates a new user",
        args:{
            input: {
                type: new GraphQLNonNull(userInput)
            }
        },
        resolve: (root, {input}, context) => {
            const user = new User(null, input);
            return user.create();
        }
    },
    updateUser: {
        type: userOutput.type,
        description: "Updates an existing user",
        args:{
            input:{
                type: new GraphQLNonNull(userInput)
            }
        },
        resolve: (root, {input}, context, info) => {
            const user = new User(input.id, input);
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
            const user = new User(input.id);
            return user.delete();
        }
    }
}

module.exports = userMutation;