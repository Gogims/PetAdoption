const frequencyOutput = require('../outputs/frequencyType');
const frequencyInput = require('../inputs/frequencyType');
const { GraphQLNonNull } = require('graphql');
const Frequency = require('../../frequency');
const { resolver } = require('graphql-sequelize');
const deletedType = require('../outputs/deleted');
const db = require('../../sequelize/db');

const frequencyMutation = {
    createFrequency: {
        type:  frequencyOutput.type,
        description: "Creates a new frequency",
        args:{
            input: {
                type: new GraphQLNonNull(frequencyInput)
            }
        },
        resolve: (root, {input}, context) => {
            const frequency = new Frequency(null, input.frequency);
            return frequency.create();
        }
    },
    updateFrequency: {
        type: frequencyOutput.type,
        description: "Updates an existing frequency",
        args:{
            input:{
                type: new GraphQLNonNull(frequencyInput)
            }
        },
        resolve: (root, {input}, context, info) => {
            const frequency = new Frequency(input.id, input.frequency);
            return frequency.update();
        }
    },
    deleteFrequency: {
        type: deletedType,
        description: "Deletes an existing frequency",
        args:{
            input:{
                type: new GraphQLNonNull(frequencyInput)
            }
        },
        resolve: (root, {input}, context) => {
            const frequency = new Frequency(input.id);
            return frequency.delete();
        }
    }
}

module.exports = frequencyMutation;