const breedType = require('../types/breed');
const breedInput = require('../types/inputs/breed');
const { GraphQLNonNull } = require('graphql');
const Breed = require('../../breed');
const deletedType = require('../types/deleted');
const db = require('../../sequelize/db');
const Auth = require('../authentication');

const breedMutation = {
    createBreed: {
        type:  breedType,
        description: "Creates a new breed",
        args:{
            input: {
                type: new GraphQLNonNull(breedInput)
            }
        },
        resolve: Auth.hasRole("admin", (root, {input}, context) => {
            const breed = new Breed(null, input.breed, input.specieId);
            return breed.create();
        })
    },
    updateBreed: {
        type: breedType,
        description: "Updates an existing breed",
        args:{
            input:{
                type: new GraphQLNonNull(breedInput)
            }
        },
        resolve: Auth.hasRole("admin", (root, {input}, context, info) => {
            const breed = new Breed(input.id, input.breed, input.specieId);
            return breed.update();
        })
    },
    deleteBreed: {
        type: deletedType,
        description: "Deletes an existing breed",
        args:{
            input:{
                type: new GraphQLNonNull(breedInput)
            }
        },
        resolve: Auth.hasRole("admin", (root, {input}, context) => {
            const breed = new Breed(input.id);
            return breed.delete();
        })
    }
}

module.exports = breedMutation;