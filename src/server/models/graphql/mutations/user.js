const userType = require('../types/user');
const userInput = require('../types/inputs/user');
const { GraphQLNonNull, GraphQLString } = require('graphql');
const User = require('../../user');
const { resolver } = require('graphql-sequelize');
const deletedType = require('../types/deleted');
const db = require('../../sequelize/db');
const jwtConfig = require('../../../config/jwt');
const jwt = require('jsonwebtoken');
const authenticate = require('../authentication');

const userMutation = {
    createUser: {
        type:  userType,
        description: "Creates a new user",
        args:{
            input: {
                type: new GraphQLNonNull(userInput)
            }
        },
        resolve: authenticate ((root, {input}, context) => {
            const user = new User(input);
            return user.create();
        })
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
    },
    authenticateUser: {
        type: GraphQLString,
        description: "Verify user is valid",
        args: {
            userName: {
                type: GraphQLString
            },
            password: {
                type: GraphQLString
            }
        },
        resolve: (root, {userName, password}, context) => {
            const user = new User({userName, password});
            return user.verify().then(dbUser => {
                const token = jwt.sign(dbUser, jwtConfig.jwtKey);
                return token;
            });
        }
    }
}

module.exports = userMutation;