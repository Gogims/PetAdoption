const earType = require('../types/ear');
const earInput = require('../types/inputs/ear');
const { GraphQLNonNull } = require('graphql');
const Ear = require('../../ear');
const { resolver } = require('graphql-sequelize');
const deletedType = require('../types/deleted');
const db = require('../../sequelize/db');

const earMutation = {
    createEar: {
        type:  earType,
        description: "Creates a new ear",
        args:{
            input: {
                type: new GraphQLNonNull(earInput)
            }
        },
        resolve: (root, {input}, context) => {
            const ear = new Ear(null, input.ear);
            return ear.create();
        }
    },
    updateEar: {
        type: earType,
        description: "Updates an existing ear",
        args:{
            input:{
                type: new GraphQLNonNull(earInput)
            }
        },
        resolve: (root, {input}, context, info) => {
            const ear = new Ear(input.id, input.ear);
            return ear.update();
        }
    },
    deleteEar: {
        type: deletedType,
        description: "Deletes an existing ear",
        args:{
            input:{
                type: new GraphQLNonNull(earInput)
            }
        },
        resolve: (root, {input}, context) => {
            const ear = new Ear(input.id);
            return ear.delete();
        }
    }
}

module.exports = earMutation;