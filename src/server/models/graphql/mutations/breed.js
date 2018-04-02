const breedType = require('../types/breed');
const breedInput = require('../types/inputs/breed');
const { GraphQLNonNull } = require('graphql');
const Breed = require('../../breed');
const { resolver } = require('graphql-sequelize');
const deletedType = require('../types/deleted');
const db = require('../../sequelize/db');

const breedMutation = {
    createBreed: {
        type:  breedType,
        description: "Creates a new breed",
        args:{
            input: {
                type: new GraphQLNonNull(breedInput)
            }
        },
        resolve: (root, {input}, context) => {
            const breed = new Breed(null, input.breed, input.specieId);
            return breed.create();
        }
    },
    updateBreed: {
        type: breedType,
        description: "Updates an existing breed",
        args:{
            input:{
                type: new GraphQLNonNull(breedInput)
            }
        },
        resolve: (root, {input}, context, info) => {
            const breed = new Breed(input.id, input.breed, input.specieId);
            return breed.update();
        }
    },
    deleteBreed: {
        type: deletedType,
        description: "Deletes an existing breed",
        args:{
            input:{
                type: new GraphQLNonNull(breedInput)
            }
        },
        resolve: (root, {input}, context) => {
            const breed = new Breed(input.id);
            return breed.delete();
        }
    }
}

module.exports = breedMutation;