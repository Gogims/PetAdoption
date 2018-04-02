const frequencyType = require('../types/frequency');
const frequencyInput = require('../types/inputs/frequency');
const { GraphQLNonNull } = require('graphql');
const Frequency = require('../../frequency');
const { resolver } = require('graphql-sequelize');
const deletedType = require('../types/deleted');
const db = require('../../sequelize/db');

const frequencyMutation = {
    createFrequency: {
        type:  frequencyType,
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
        type: frequencyType,
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