const userType = require('../types/user');
const userInput = require('../types/inputs/user');
const { GraphQLNonNull, GraphQLString } = require('graphql');
const User = require('../../user');
const deletedType = require('../types/deleted');
const jwtConfig = require('../../../config/jwt');
const jwt = require('jsonwebtoken');
const Auth = require('../authentication');
const LoggedUser = require('../types/loggedUser');

const userMutation = {
    createUser: {
        type:  userType,
        description: "Creates a new user",
        args:{
            input: {
                type: new GraphQLNonNull(userInput)
            }
        },
        resolve: Auth.hasRole('admin', ((root, {input}, context) => {
            const user = new User(input);
            return user.create();
        }))
    },
    updateUser: {
        type: userType,
        description: "Updates an existing user",
        args:{
            input:{
                type: new GraphQLNonNull(userInput)
            }
        },
        resolve: Auth.hasRole('admin', ((root, {input}, context, info) => {
            const user = new User(input);
            return user.update();
        }))
    },
    deleteUser: {
        type: deletedType,
        description: "Deletes an existing user",
        args:{
            input:{
                type: new GraphQLNonNull(userInput)
            }
        },
        resolve: Auth.hasRole('admin', (root, {input}, context) => {
            const user = new User(input);
            return user.delete();
        })
    },
    authenticateUser: {
        type: LoggedUser,
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
                return {
                    user: dbUser,
                    token
                };
            });
        }
    }
}

module.exports = userMutation;