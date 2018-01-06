const specieOutput = require('../outputs/specieType');
const specieInput = require('../inputs/specieType');
const { GraphQLNonNull } = require('graphql');
const specieClass = require('../../specie');
const { resolver } = require('graphql-sequelize');
const Specie = require('../../sequelize/specie');

let resolverFn = resolver(Specie);

const specieMutation = {
    createSpecie: {
        type:  specieOutput,
        description: "Creates a new specie",
        args:{
            input: {
                type: new GraphQLNonNull(specieInput)
            }
        },
        resolve: (root, {input}, context) => {
            const specie = new specieClass(input.specie);
            return specie.create();
        }
    }
}

module.exports = specieMutation;