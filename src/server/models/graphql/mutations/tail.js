const tailType = require('../types/tail');
const tailInput = require('../types/inputs/tail');
const { GraphQLNonNull } = require('graphql');
const Tail = require('../../tail');
const { resolver } = require('graphql-sequelize');
const deletedType = require('../types/deleted');
const db = require('../../sequelize/db');

const tailMutation = {
    createTail: {
        type:  tailType,
        description: "Creates a new tail",
        args:{
            input: {
                type: new GraphQLNonNull(tailInput)
            }
        },
        resolve: (root, {input}, context) => {
            const tail = new Tail(null, input.tail);
            return tail.create();
        }
    },
    updateTail: {
        type: tailType,
        description: "Updates an existing tail",
        args:{
            input:{
                type: new GraphQLNonNull(tailInput)
            }
        },
        resolve: (root, {input}, context, info) => {
            const tail = new Tail(input.id, input.tail);
            return tail.update();
        }
    },
    deleteTail: {
        type: deletedType,
        description: "Deletes an existing tail",
        args:{
            input:{
                type: new GraphQLNonNull(tailInput)
            }
        },
        resolve: (root, {input}, context) => {
            const tail = new Tail(input.id);
            return tail.delete();
        }
    }
}

module.exports = tailMutation;