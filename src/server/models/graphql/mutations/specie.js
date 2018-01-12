const specieOutput = require('../outputs/specieType');
const specieInput = require('../inputs/specieType');
const { GraphQLNonNull } = require('graphql');
const Specie = require('../../specie');
const { resolver } = require('graphql-sequelize');
const deletedType = require('../outputs/deleted');
const db = require('../../sequelize/db');

const specieMutation = {
    createSpecie: {
        type:  specieOutput.type,
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
        type: specieOutput.type,
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