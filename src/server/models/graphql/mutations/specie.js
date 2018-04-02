const speciaType = require('../types/specie');
const specieInput = require('../types/inputs/specie');
const { GraphQLNonNull } = require('graphql');
const Specie = require('../../specie');
const { resolver } = require('graphql-sequelize');
const deletedType = require('../types/deleted');
const db = require('../../sequelize/db');

const specieMutation = {
    createSpecie: {
        type:  speciaType,
        description: "Creates a new specie",
        args:{
            input: {
                type: new GraphQLNonNull(specieInput)
            }
        },
        resolve: (root, {input}, context) => {
            const specie = new Specie(null, input.specie);
            return specie.create();
        }
    },
    updateSpecie: {
        type: speciaType,
        description: "Updates an existing specie",
        args:{
            input:{
                type: new GraphQLNonNull(specieInput)
            }
        },
        resolve: (root, {input}, context, info) => {
            const specie = new Specie(input.id, input.specie);
            return specie.update();
        }
    },
    deleteSpecie: {
        type: deletedType,
        description: "Deletes an existing specie",
        args:{
            input:{
                type: new GraphQLNonNull(specieInput)
            }
        },
        resolve: (root, {input}, context) => {
            const specie = new Specie(input.id);
            return specie.delete();
        }
    }
}

module.exports = specieMutation;