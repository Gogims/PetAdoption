const experienceOutput = require('../outputs/experienceType');
const experienceInput = require('../inputs/experienceType');
const { GraphQLNonNull } = require('graphql');
const Experience = require('../../experience');
const { resolver } = require('graphql-sequelize');
const deletedType = require('../outputs/deleted');
const db = require('../../sequelize/db');

const experienceMutation = {
    createExperience: {
        type:  experienceOutput.type,
        description: "Creates a new experience",
        args:{
            input: {
                type: new GraphQLNonNull(experienceInput)
            }
        },
        resolve: (root, {input}, context) => {
            const experience = new Experience(null, input.experience);
            return experience.create();
        }
    },
    updateExperience: {
        type: experienceOutput.type,
        description: "Updates an existing experience",
        args:{
            input:{
                type: new GraphQLNonNull(experienceInput)
            }
        },
        resolve: (root, {input}, context, info) => {
            const experience = new Experience(input.id, input.experience);
            return experience.update();
        }
    },
    deleteExperience: {
        type: deletedType,
        description: "Deletes an existing experience",
        args:{
            input:{
                type: new GraphQLNonNull(experienceInput)
            }
        },
        resolve: (root, {input}, context) => {
            const experience = new Experience(input.id);
            return experience.delete();
        }
    }
}

module.exports = experienceMutation;